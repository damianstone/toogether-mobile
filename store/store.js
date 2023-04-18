import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { authenticateReducer } from './reducers/auth';
import {
  userLocationReducer,
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
  reportProfileReducer,
  sendRecoveryCodeReducer,
  validateCodeReducer,
  changePasswordReducer,
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

const reducer = combineReducers({
  auth: authenticateReducer,
  // profile API
  userLocation: userLocationReducer,
  tokenRefresh: tokenRefreshReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userDelete: userDeleteReducer,
  userCreateProfile: userCreateProfileReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userGetProfile: userGetProfileReducer,
  reportProfile: reportProfileReducer,
  // Photos API
  userAddPhoto: userAddPhotoReducer,
  userRemovePhoto: userRemovePhotoReducer,
  userListPhotos: userListPhotosReducer,
  // Rcovery API
  sendRecoveryCode: sendRecoveryCodeReducer,
  validateCode: validateCodeReducer,
  changePassword: changePasswordReducer,
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
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
