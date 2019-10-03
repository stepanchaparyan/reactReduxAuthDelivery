import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { signUp } from '../../store/actions/authActions';
import DocumentTitle from 'react-document-title';
import PropTypes from 'prop-types';
import { ValidationForm, TextInput, TextInputGroup } from 'react-bootstrap4-form-validation';
import validator from 'validator';
import { DebounceInput } from 'react-debounce-input';
import { Button, Image } from 'react-components';
import Constants from '../../constants';
import M from '../../Messages';
import logo from '../../assets/logo.png';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    displayName: '',
    phoneNumber: '',
    user: '',
    photoURL: Constants.photoURL
  }

  static propTypes = {
    user: PropTypes.object,
    auth: PropTypes.shape({
      uid: PropTypes.string
    }),
    authError: PropTypes.any,
    signUp: PropTypes.func.isRequired
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state);
  }

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) {return <Redirect to='/' />; }
    return (
      <DocumentTitle title='Simple Auth App - Sign Up'>
        <div className="loginContainer">
        <div className="formAuth">
          <div className="logo">
            <Image src={logo} id='logo' alt="Logo" height={25} width={200} />
          </div>
          <div className="signAuth__title">{M.get('signup')}</div>
          <ValidationForm onSubmit={this.handleSubmit}>
            <div className="form-group">
                <label className="lebel" htmlFor="email">{M.get('email')}</label>
                <DebounceInput element={TextInput}
                    debounceTimeout={500}
                    name="email"
                    id="email"
                    type="email"
                    validator={validator.isEmail}
                    errorMessage={{ validator: 'Please enter a valid email' }}
                    value={this.state.email}
                    onChange={this.handleChange}
                />
            </div>
            <div className="form-group">
                <label className="lebel" htmlFor="password">{M.get('password')}</label>
                <DebounceInput element={TextInputGroup}
                    debounceTimeout={500}
                    name="password"
                    id="password"
                    type={this.state.type}
                    required
                    pattern=".{6,}"
                    errorMessage={{
                        required: 'Password is required',
                        pattern: 'Password should be at least 6 characters long'
                    }}
                    value={this.state.password}
                    onChange={this.handleChange}
                    autoComplete='true'
                />
            </div>
            <div className="form-group">
                <label className="lebel" htmlFor="displayName">{M.get('displayName')}</label>
                <DebounceInput element={TextInputGroup}
                    debounceTimeout={500}
                    name="displayName"
                    id="displayName"
                    type="text"
                    required
                    pattern=".{3,}"
                    errorMessage={{
                        required: 'Name is required',
                        pattern: 'Name should be at least 3 characters long'
                    }}
                    value={this.state.displayName}
                    onChange={this.handleChange}
                />
            </div>
            <div id="wrongUser">
                { authError ? <p>{authError}</p> : null }
              </div>
            <div className="form-group">
                <Button className="btnSign">{M.get('submit')}</Button>
            </div>
        </ValidationForm>
        </div>
      </div>
     </DocumentTitle>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

const mapDispatchToProps = (dispatch)=> {
  return {
    signUp: (creds) => dispatch(signUp(creds))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);