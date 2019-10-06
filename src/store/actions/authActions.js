import { LOGIN_SUCCESS, LOGIN_ERROR, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR, SIGNUP_SUCCESS, SIGNUP_ERROR } from '../../constants';

export const signIn = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
      ).then(() => {
        dispatch({ type: LOGIN_SUCCESS });
      }).catch((err) => {
        dispatch({ type: LOGIN_ERROR, err });
      });
  };
};

export const resetPassword = (email) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      dispatch({ type: RESET_PASSWORD_SUCCESS });
    }).catch((err) => {
      dispatch({ type: RESET_PASSWORD_ERROR, err });
    });
  };
};

export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();
    firebase.auth().signOut();
    firebase.logout();
  };
};

export const signUp = (newUser) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
      newUser.email,
      newUser.password
    ).then(resp => {
      return firestore.collection('users').doc(resp.user.uid).set({
        created: new Date(),
        updated: new Date(),
        displayName: newUser.displayName,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        photoURL: newUser.photoURL
      });
    }).then(() => {
      dispatch({ type: SIGNUP_SUCCESS });
    }).catch((err) => {
      dispatch({ type: SIGNUP_ERROR, err});
    });
  };
};