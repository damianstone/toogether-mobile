import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import {
  userLocationReducer,
  authenticateReducer,
  tokenRefreshReducer,
  userAddPhotoReducer,
  userRemovePhotoReducer,
  userCreateProfileReducer,
  userUpdateProfileReducer,
  userListPhotosReducer,
  userLoginReducer,
  userRegisterReducer,
  userDeleteReducer,
  userGetProfileReducer,
} from './reducers/user';
import {
  listGroupReducer,
  getGroupReducer,
  createGroupReducer,
  deleteGroupReducer,
  joinGroupReducer,
  leaveGroupReducer,
  removeMemberReducer,
} from './reducers/group';
import { listSwipeReducer } from './reducers/swipe';

// TODO: fix this error: when reload here screen change to login

const reducer = combineReducers({
  // profile API
  userLocation: userLocationReducer,
  auth: authenticateReducer,
  tokenRefresh: tokenRefreshReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userDelete: userDeleteReducer,
  userCreateProfile: userCreateProfileReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userGetProfile: userGetProfileReducer,
  // photos API
  userAddPhoto: userAddPhotoReducer,
  userRemovePhoto: userRemovePhotoReducer,
  userListPhotos: userListPhotosReducer,
  // Group API
  listGroup: listGroupReducer,
  getGroup: getGroupReducer,
  createGroup: createGroupReducer,
  deleteGroup: deleteGroupReducer,
  joinGroup: joinGroupReducer,
  leaveGroup: leaveGroupReducer,
  removeMember: removeMemberReducer,
  // Swipe API
  listSwipe: listSwipeReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
