import { createStore, combineReducers, applyMiddleware } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import thunk from 'redux-thunk';
import {
  userRegisterReducer,
  userLoginReducer,
  userCreateProfileReducer,
  userAddPhotoReducer,
} from '../store/reducers/user';

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userCreateProfile: userCreateProfileReducer,
  userAddPhoto: userAddPhotoReducer,
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
