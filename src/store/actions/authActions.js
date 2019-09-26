export const signIn = (credentials) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password
    ).then((data) => {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
    }).catch((err) => {
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  };
};

export const resetPassword = (email) => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      dispatch({ type: 'RESET_PASSWORD' });
    }).catch((err) => {
      dispatch({ type: 'RESET_PASSWORD_ERROR', err });
    });
  };
};

export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'SIGNOUT_SUCCESS' });
    });
  };
};

export const signUp = (newUser) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    console.log('newUser Actions', newUser);

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
      dispatch({ type: 'SIGNUP_SUCCESS' });
    }).catch((err) => {
      dispatch({ type: 'SIGNUP_ERROR', err});
    });
  };
};