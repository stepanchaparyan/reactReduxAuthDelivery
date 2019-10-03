const initState = {
    authError: null
  };

  const authReducer = (state = initState, action) => {
    switch (action.type){
      case 'LOGIN_ERROR':
        console.log('login error');
        return {
          ...state,
          authError: action.err.message
        };
      case 'LOGIN_SUCCESS':
        console.log('login success');
        return {
          ...state,
          authError: null
        };
      case 'RESET_PASSWORD_ERROR':
        console.log('reset password error');
        return {
          ...state,
          authError: action.err.message
      };
      case 'RESET_PASSWORD':
        console.log('reset password sent');
        return {
          ...state,
          authError: null
      };
      case 'SIGNOUT_SUCCESS':
        console.log('signout success');
        return state;
      case 'SIGNUP_SUCCESS':
        console.log('signup success');
        return {
          ...state,
          authError: null
        };
      case 'SIGNUP_ERROR':
        console.log('signup error');
        return {
          ...state,
          authError: action.err.message
        };
      default:
        return state;
    }
  };

  export default authReducer;