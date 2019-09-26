import React, {Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Navbar, NavbarBrand } from 'reactstrap';
import SignedInLinks from './signedInLinks';
import SignedOutLinks from './signedOutLinks';
import firebase from '../../config/fbConfig';
import { Image } from 'react-components';
import logoSignIn from '../../assets/logoSignIn.png';
import '../../styles.scss';

class MyNavbar extends Component {
  static propTypes = {
    auth: PropTypes.object,
    profile: PropTypes.object,
    signOut: PropTypes.func
  };

  signOut = () => {
      firebase.auth().signOut();
  }

  render () {
    console.log('props in navbar ', this.props);
    const { auth, profile } = this.props;
    const links = auth.uid ? <SignedInLinks auth={auth} profile={profile} signOut={this.signOut} /> : <SignedOutLinks />;

    return (
      <Navbar className="p-2 bg-info text-white" light expand="md">
        <Container>
          <NavbarBrand href="/">
              <Image src={logoSignIn} alt="Logo" width={200} height={22}/>
          </NavbarBrand>
          {links}
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('ssssss', state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    authError: state.auth.authError
  };
};


export default connect(mapStateToProps)(MyNavbar);
