import AsyncStorage from '@react-native-async-storage/async-storage';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import {
  userAddPhotoReducer,
  userRemovePhotoReducer,
  userCreateProfileReducer,
  userUpdateProfileReducer,
  userListPhotosReducer,
  userLoginReducer,
  userRegisterReducer,
  userGetProfileReducer,
} from './reducers/user';

const reducer = combineReducers({
  // profile API
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userCreateProfile: userCreateProfileReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userGetProfile: userGetProfileReducer,
  // photos API
  userAddPhoto: userAddPhotoReducer,
  userRemovePhoto: userRemovePhotoReducer,
  userListPhotos: userListPhotosReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
