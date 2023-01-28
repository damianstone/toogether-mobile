import * as r from '../constants/responses/match';

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
  showModes
  -1 = error location
  0 = not found
  1 = all cards swiped
  2 = swipe
  3= match

  return the number of the show mode
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
  } else if (!permissionGranted) {
    return -1;
  } else if (postLocationError && !exist(swipe)) {
    return -1;
  } else if (!exist(swipe) || errorSwipe) {
    return 0;
  } else if (swipe?.results.length === 0 && !exist(topProfile)) {
    return 0;
  } else if (swipe?.results.length > 0 || exist(topProfile)) {
    return 2;
  }
  return currentShowMode;
};

export const isMatch = (likeData) => {
  if (likeData?.details === r.NEW_MATCH || likeData?.details === r.SAME_MATCH) {
    return true;
  }
  return false;
};

export const alreadyMatched = (likeData) => {
  if (likeData?.details === r.ALREADY_MATCHED) {
    return true;
  }
  return false;
};

export const checkMemberInGroup = (memberId, groupMembers) => {
  const fromIndex = groupMembers.findIndex((elem) => elem.id === memberId);

  if (fromIndex !== -1) {
    return true;
  }

  return false;
};
