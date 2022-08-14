import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { userRegisterReducer, userLoginReducer } from '../store/reducers/user';

const reducer = combineReducers({
  userRegister: userRegisterReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
