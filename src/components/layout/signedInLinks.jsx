import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import { Icon, Image, Tooltip } from 'react-components';
import M from '../../Messages';
import { signOut } from '../../store/actions/authActions';
import { connect } from 'react-redux';
import ProfileDetails from './profileDetails.';

class SignedInLinks extends Component {
  static propTypes = {
    signOut: PropTypes.func,
    auth: PropTypes.object,
    profile: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  showExtraInfo = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  render() {
    const { profile, auth } = this.props;
    return (
      <Nav pills>
        <NavLink
          exact
          to="/shops"
          className="nav__shop__link text-white nav-text"
        >
          {M.get('shops')}
        </NavLink>
        <Tooltip position="bottom" content={profile.displayName}>
          <NavItem className="nav__profileName text-ellipsis">
            {profile.displayName}
          </NavItem>
        </Tooltip>
        <Image
          circle
          width={40}
          height={40}
          className="nav__avatar"
          src={profile.photoURL}
          onClick={this.showExtraInfo}
        />
        <div className="navbar__profileInfo">
          {this.state.show && <ProfileDetails profile={profile} auth={auth} />}
        </div>
        <Tooltip content={M.get('signOut')} position="bottom">
          <NavItem onClick={this.props.signOut}>
            <Icon name="sign-out" size={1.9} />
          </NavItem>
        </Tooltip>
      </Nav>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinks);
