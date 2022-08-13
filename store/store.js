import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  userRegisterReducer,
  userLoginReducer,
  userCreateReducer,
} from '../store/reducers/user';

const reducer = combineReducers({
  // user
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userCreate: userCreateReducer,
});

// const userFromStorage = localStorage.getItem('user')
//   ? JSON.parse(localStorage.getItem('user') || '')
//   : {};

// const userTokenFromStorage = localStorage.getItem('token')
//   ? JSON.parse(localStorage.getItem('token') || '')
//   : null;

const initialState = {
  user: { token: '', userInfo: {} },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
