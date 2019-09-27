import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import { Jumbotron } from 'reactstrap';
import M from '../../Messages';
import ReactPlayer from 'react-player';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  static propTypes = {
    auth: PropTypes.object,
    user: PropTypes.object
  };

  showExtraInfo = () => {
    this.setState ({
      show: !this.state.show
    });
  }

  render() {
    const { auth } = this.props;
    if (!auth.uid) {return <Redirect to='/signIn' />;}
    return (
      <DocumentTitle title='Simple Auth App - Dashboard'>
        <div className="dashboard">
            <Jumbotron>
              <h1 className="dashboard__text--lg">{M.get('dashboard.helloEveryone!')}</h1>
              <p className="dashboard__text--sm">{M.get('dashboard.informationPageAboutSignedUser')}</p>
              <hr />
              <div className='showFavorites' onClick={this.showExtraInfo}>{M.get('dashboard.showMyFavorites')}</div>
            </Jumbotron>
            {this.state.show &&
              <div className='dashboard__favorites'>

                  <div>
                      <p className='favorite-section-title'>{M.get('dashboard.myFavoriteSong')}</p>
                      <ReactPlayer
                          url='https://www.youtube.com/watch?v=PfAWReBmxEs'
                          controls
                          width={200}
                          height={200}
                      />
                  </div>
              </div>
            }
        </div>
      </DocumentTitle>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    authError: state.auth.authError
  };
};

export default connect(mapStateToProps, null)(Dashboard);
