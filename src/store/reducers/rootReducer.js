import authReducer from './authReducer';
import shopReducer from './shopReducer';
import productReducer from './productReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  shopReducer: shopReducer,
  productReducer: productReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer;

