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

const getUserFromStorage = async () => {
  try {
    const userData = await AsyncStorage.getItem('@userData');
    return userData != null ? JSON.parse(userData) : null;
  } catch (error) {
    return {};
  }
};

const initialState = {
  userLogin: {
    userData: getUserFromStorage().then((userData) => {
      return userData;
    }),
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
