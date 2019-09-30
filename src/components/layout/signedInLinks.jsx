import React, {Component, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem, Progress } from 'reactstrap';
import PropTypes from 'prop-types';
import firebase, {storage} from '../../config/fbConfig';
import ReactTooltip from 'react-tooltip';
import { Button, Icon, Image, Tooltip } from 'react-components';
import M from '../../Messages';
import { signOut } from '../../store/actions/authActions';
import { connect } from 'react-redux';

class SignedInLinks extends Component {
  static propTypes = {
    signOut: PropTypes.func,
    auth: PropTypes.object,
    profile: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      image: null,
      progress: 0,
      show: false,
      editableName: false,
      editablePhoneNumber: false

    };
    this.textInputName = React.createRef();
    this.textInputPhoneNumber = React.createRef();
    this.textInputPassword = React.createRef();

    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.showExtraInfo = this.showExtraInfo.bind(this);
    this.resetProgress = this.resetProgress.bind(this);
    this.updateUserPhotoURL = this.updateUserPhotoURL.bind(this);
    this.confirmNewName = this.confirmNewName.bind(this);
    this.confirmNewPhoneNumber = this.confirmNewPhoneNumber.bind(this);
  }

  showExtraInfo = () => {
    this.setState ({
      show: !this.state.show
    });
  }

  resetProgress = () => {
    this.setState ({
      progress: 0
    });
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({image}));
      this.resetProgress();
    }
  }

  handleUpload = () => {
    const uid = this.props.auth.uid;
    const {image} = this.state;
    const uploadTask = storage.ref(`${uid}/${image.name}`).put(image);
    uploadTask.on('state_changed',
    (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      this.setState({progress});
    },
    (error) => {
      console.log(error);
    },
    () => {
      storage.ref(uid).child(image.name).getDownloadURL().then(photoURL => {
        this.updateUserPhotoURL(photoURL);
        firebase.firestore().collection('users').doc(uid).update({
          photoURL: photoURL,
          updated: new Date()
        });
        this.setState({photoURL});
        this.setState({image:null});
      });
    });
  }

  updateUserPhotoURL = (photoURL) => {
    let user = firebase.auth().currentUser;
    user.updateProfile({
      photoURL: photoURL
    }).catch(function(error) {
      console.log(error);
    });
  }

  updateAuthUserDisplayName = (displayName) => {
    let user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: displayName
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  updateFirestoreUserDisplayName = (displayName) => {
    const uid = this.props.auth.uid;
    firebase.firestore().collection('users').doc(uid).update({
        displayName: displayName,
        updated: new Date()
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  confirmNewName = (e) => {
    e.preventDefault();
    this.setState({editableName: !this.state.editableName});
    const displayName = this.textInputName.current.value;
    this.setState({displayName: displayName});
    this.updateAuthUserDisplayName(displayName);
    this.updateFirestoreUserDisplayName(displayName);
  }

  updateFirestoreUserPhoneNumber = (phoneNumber) => {
    const uid = this.props.auth.uid;
    firebase.firestore().collection('users').doc(uid).update({
        phoneNumber: phoneNumber,
        updated: new Date()
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  confirmNewPhoneNumber = (e) => {
    e.preventDefault();
    this.setState({editablePhoneNumber: !this.state.editablePhoneNumber});
    const phoneNumber = this.textInputPhoneNumber.current.value;
    this.setState({phoneNumber: phoneNumber});
    this.updateFirestoreUserPhoneNumber(phoneNumber);
  }

  render () {
    const { profile, auth } = this.props;
    // console.log('profile', profile);
    // console.log('auth', auth);
    return (
      <Nav pills>
        <NavLink exact to='/shops' className="nav__shop__link text-white nav-text">
          {M.get('shops')}
        </NavLink>
        <Tooltip
            position="bottom"
            content={profile.displayName}
          >
          <NavItem
              className="nav__profileName text-ellipsis">
              {auth.displayName || profile.displayName}
          </NavItem>
        </Tooltip>
        <Image
            circle
            width={40}
            height={40}
            className='nav__avatar'
            src={auth.photoURL}
            onClick={this.showExtraInfo}
        />
        <div className='navbar__profileInfo'>
            {this.state.show &&
                <div className='navbar__profileInfo__full'>
                  <div className='navbar__profileInfo__leftPart'>

                      <div className='navbar__profileInfo__leftPart__title'>{M.get('userName')}</div>
                      { this.state.editableName ?

                      <Fragment>
                        <div className="profile__data__editable">
                            <Icon name='check' size={1.2} className="navbar__profileInfo__faEdit" onClick={this.confirmNewName} />
                            <input type="text" className="navbar__profileInfo__editableInput" ref={this.textInputName} defaultValue={profile.displayName}></input>
                        </div>
                      </Fragment> :

                      <Fragment>
                        <div className="profile__data__editable text-ellipsis"
                              data-tip={profile.displayName}>
                              <Icon name='edit' size={1.2} className="navbar__profileInfo__faEdit" onClick={() => this.setState({editableName: !this.state.editableName})} />
                              {profile.displayName}
                        </div>
                        <ReactTooltip className='navbar__profileInfo__editableInput__tooltipClass' place="left" type="info" effect="solid" />
                      </Fragment>
                      }

                      <div className='navbar__profileInfo__leftPart__title'>{M.get('phoneNumber')}</div>
                      { this.state.editablePhoneNumber ?

                      <Fragment>
                        <Icon name='check' size={1.2} className="navbar__profileInfo__faEdit" onClick={this.confirmNewPhoneNumber} />
                        <input type="number" className="navbar__profileInfo__editableInput" ref={this.textInputPhoneNumber} defaultValue={profile.phoneNumber}></input>
                      </Fragment> :

                      <Fragment>
                        <div className="profile__data__editable text-ellipsis"
                              data-tip={profile.phoneNumber}>
                              <Icon name='edit' size={1.2} className="navbar__profileInfo__faEdit" onClick={() => this.setState({editablePhoneNumber: !this.state.editablePhoneNumber})} />
                              {profile.phoneNumber}
                        </div>
                        <ReactTooltip className='navbar__profileInfo__editableInput__tooltipClass' place="left" type="info" effect="solid" />
                      </Fragment>
                      }

                  </div>

                  <div className="navbar__profileInfo__rightPart">
                      <Fragment>
                          <label htmlFor="navbar__profileInfo__fileInput">
                              <Image
                                  className='navbar__profileInfo__uploadingImage'
                                  src={profile.photoURL}
                                  width={120}
                                  height={120}
                              />
                          </label>
                          <input className="navbar__profileInfo__fileInput"
                            id="navbar__profileInfo__fileInput"
                            type="file"
                            onChange={this.handleChange}
                          />
                      </Fragment>
                      <Progress
                          color="info"
                          value={this.state.progress}
                          max='100'>
                          {this.state.progress}%
                      </Progress>
                      <Button className='navbar__profileInfo__uploadBtn'
                          onClick={this.handleUpload}
                          disabled={!this.state.image}
                          >
                          {M.get('upload')}
                      </Button>
                  </div>
                </div>
            }
        </div>
        <Tooltip
            content={M.get('signOut')}
            position='bottom'
          >
            <NavItem
              onClick={this.props.signOut} >
              <Icon name='sign-out' size={1.9} />
            </NavItem>
        </Tooltip>
      </Nav>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(null, mapDispatchToProps)(SignedInLinks);
