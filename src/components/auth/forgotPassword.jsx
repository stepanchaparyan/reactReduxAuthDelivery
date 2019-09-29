import React, { Component } from 'react';
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation';
import DocumentTitle from 'react-document-title';
import validator from 'validator';
import { Button, Image } from 'react-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetPassword } from '../../store/actions/authActions';
import M from '../../en.messages';
import logo from '../../assets/logo.png';

class ForgotPasword extends Component {
    state = {
        email: ''
    }

    static propTypes = {
        resetPassword: PropTypes.func
      };

    handleChange = (e) => {
        this.setState({
            email: e.target.value
        });
    }

    resetPassword = (e) => {
        e.preventDefault();
        this.props.resetPassword(this.state.email);
    }

    render () {
        return (
          <DocumentTitle title='Simple Auth App - ForgotPasword'>
            <div className="loginContainer">
            <div className="formForgotPassword">
                <div className="logo">
                    <Image id='logo' src={logo} alt="Logo" width={180} height={25}/>
                </div>
                <div className="forgot__title">{M.get('forgotPassword')}</div>
                <ValidationForm onSubmit={this.resetPassword}>
                    <div className="form-group">
                        <label className="lebel" htmlFor="email">{M.get('resetPassword')}</label>
                        <TextInput name="email"
                                   id="email"
                                   type="email"
                                   validator={validator.isEmail}
                                   errorMessage={{validator:'Please enter a valid email'}}
                                   value={this.state.email}
                                   onChange={this.handleChange}
                        />
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

const mapDispatchToProps = (dispatch) => {
    return {
        resetPassword: (email) => dispatch(resetPassword(email))
    };
};

export default connect(null, mapDispatchToProps)(ForgotPasword);
