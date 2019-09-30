import authReducer from './authErrorReducer';
import shopReducer from './shopErrorReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  authErrorReducer: authReducer,
  shopErrorReducer: shopReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;

