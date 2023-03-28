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
  listBlockedProfilesReducer,
  blockProfileReducer,
  unBlockProfileReducer,
} from './reducers/block';
import {
  listGroupReducer,
  getGroupReducer,
  createGroupReducer,
  deleteGroupReducer,
  joinGroupReducer,
  leaveGroupReducer,
  removeMemberReducer,
} from './reducers/group';
import {
  listSwipeReducer,
  getSwipeProfileReducer,
  listLikesReducer,
  likeReducer,
  removeLikeReducer,
  listMatchesReducer,
  deleteMatchReducer,
} from './reducers/swipe';
import { reportProfileReducer } from './reducers/report';

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
  // Block API
  listBlockedProfiles: listBlockedProfilesReducer,
  blockProfile: blockProfileReducer,
  unBlockProfile: unBlockProfileReducer,
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
  getSwipeProfile: getSwipeProfileReducer,
  listLikes: listLikesReducer,
  like: likeReducer,
  removeLike: removeLikeReducer,
  listMatches: listMatchesReducer,
  deleteMatch: deleteMatchReducer,
  // Report API
  reportProfile: reportProfileReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
