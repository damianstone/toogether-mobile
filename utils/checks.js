import * as r from '../constants/responses/match';
import { getImage } from './getMethods';

/*
 * check if the value exists
 * @param {any} value - any value that we need to check if its exist
 * @return - true if it exists, false otherwise
 */
export const exist = (value) => {
  if (!value) {
    return false;
  }
  if (typeof value === 'undefined') {
    return false;
  }
  if (value === undefined) {
    return false;
  }
  if (value == null) {
    return false;
  }
  if (value === null) {
    return false;
  }
  return true;
};

/* 
  * getShowMode function determines which show mode to display based on current mode, swipe data, errors and permissions
  * @param {number} currentShowMode - current show mode
  * @param {Object} swipe - swipe data object
  * @param {boolean} errorSwipe - error in swipe
  * @param {Object} topProfile - top profile object
  * @param {boolean} postLocationError - error in post location
  * @param {boolean} permissionGranted - boolean indicating if permission is granted
  * @return {number} - the show mode number
  Possible show modes:
  -1 = error location
  0 = not found
  1 = all cards swiped
  2 = swipe
  3 = match
*/
export const getShowMode = (
  currentShowMode,
  swipe,
  errorSwipe,
  topProfile,
  postLocationError,
  permissionGranted
) => {
  if (currentShowMode === 3) {
    return 3;
  }
  if (!permissionGranted) {
    return -1;
  }
  if (postLocationError && !exist(swipe)) {
    return -1;
  }
  if (!exist(swipe) || errorSwipe) {
    return 0;
  }
  if (swipe?.results.length === 0 && !exist(topProfile)) {
    return 0;
  }
  if (swipe?.results.length > 0 || exist(topProfile)) {
    return 2;
  }
  return currentShowMode;
};

/*
 * This function checks if the data obtained from the backend after a like action is a match
 * @param {Object} likeData - The data obtained from the backend after a like action.
 * @return {boolean} - True if the like data details is a new match or a same match, false otherwise
 */
export const isMatch = (likeData) => {
  if (likeData?.details === r.NEW_MATCH || likeData?.details === r.SAME_MATCH) {
    return true;
  }
  return false;
};

/*
 * check if the backend data indicates that the user has already matched with the potential match
 * @param likeData - object containing details of the like action
 * @return boolean
 */
export const alreadyMatched = (likeData) => {
  if (likeData?.details === r.ALREADY_MATCHED) {
    return true;
  }
  return false;
};

/*
 * Check if a member with given memberId exists in the groupMembers array
 * @param memberId - the ID of the member to check
 * @param groupMembers - an array of objects representing the members of a group
 * @return boolean - true if the member is in the groupMembers array, false otherwise
 */
export const checkMemberInGroup = (memberId, groupMembers) => {
  // if its not a group profile, then its fine, we dont need to check this problem
  if (!exist(groupMembers)) {
    return false;
  }

  const fromIndex = groupMembers.findIndex((elem) => elem.id === memberId);

  if (fromIndex !== -1) {
    return true;
  }

  return false;
};

export const checkPhoto = (profile) => {
  if (profile && profile.photos?.length > 0) {
    return { uri: `${getImage(profile.photos[0]?.image)}` };
  }
  if (profile && profile?.photo) {
    return { uri: `${getImage(profile.photo)}` };
  }
  return require('../assets/images/placeholder-profile.png');
};

export const checkSenderPhoto = (message) => {
  if (message && message.sender_photo) {
    return { uri: `${getImage(message.sender_photo.image)}` };
  }
  return require('../assets/images/placeholder-profile.png');
};
