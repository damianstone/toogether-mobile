import * as c from '../../constants/requestTypes/user';

export const userLocationReducer = (state = {}, action) => {
  switch (action.type) {
    case c.USER_LOCATION_REQUEST:
      return {
        loading: true,
      };
    case c.USER_LOCATION_SUCCESS:
      return {
        success: true,
      };
    case c.USER_LOCATION_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case c.USER_DELETE_REQUEST:
      return {
        loading: true,
      };
    case c.USER_DELETE_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case c.USER_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case c.USER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

// -------------------------------- PROFILE REDUCERS --------------------------------

export const userGetProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case c.USER_GET_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case c.USER_GET_PROFILE_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case c.USER_GET_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case c.USER_GET_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userCreateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case c.USER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case c.USER_CREATE_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case c.USER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case c.USER_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case c.USER_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case c.USER_UPDATE_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case c.USER_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case c.USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

// -------------------------------- PHOTOS REDUCERS --------------------------------

// Same reducer for add and update photo
export const userAddPhotoReducer = (state = {}, action) => {
  switch (action.type) {
    case c.USER_ADD_PHOTO_REQUEST:
      return {
        loading: true,
      };
    case c.USER_ADD_PHOTO_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case c.USER_ADD_PHOTO_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case c.USER_ADD_PHOTO_RESET:
      return {};
    default:
      return state;
  }
};

export const userRemovePhotoReducer = (state = {}, action) => {
  switch (action.type) {
    case c.USER_REMOVE_PHOTO_REQUEST:
      return {
        loading: true,
      };
    case c.USER_REMOVE_PHOTO_SUCCESS:
      return {
        data: { ...action.payload }, // detail: "Photo deleted"
      };
    case c.USER_REMOVE_PHOTO_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case c.USER_REMOVE_PHOTO_RESET:
      return {};
    default:
      return state;
  }
};

export const userListPhotosReducer = (state = {}, action) => {
  switch (action.type) {
    case c.USER_LIST_PHOTOS_REQUEST:
      return {
        loading: true,
      };
    case c.USER_LIST_PHOTOS_SUCCESS:
      return {
        data: [...action.payload],
      };
    case c.USER_LIST_PHOTOS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

// report profile reducer
export const reportProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case c.REPORT_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case c.REPORT_PROFILE_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case c.REPORT_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case c.REPORT_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const sendRecoveryCodeReducer = (state = {}, action) => {
  switch (action.type) {
    case c.RECOVER_CODE_REQUEST:
      return {
        loading: true,
      };
    case c.RECOVERY_CODE_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case c.RECOVERY_CODE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case c.RECOVERY_CODE_RESET:
      return {};

    default:
      return state;
  }
};

export const validateCodeReducer = (state = {}, action) => {
  switch (action.type) {
    case c.VALIDATE_CODE_REQUEST:
      return {
        loading: true,
      };
    case c.VALIDATE_CODE_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case c.VALIDATE_CODE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case c.VALIDATE_CODE_RESET:
      return {};
    default:
      return state;
  }
};

export const changePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case c.CHANGE_PASSWORD_REQUEST:
      return {
        loading: true,
      };
    case c.CHANGE_PASSWORD_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case c.CHANGE_PASSWORD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case c.CHANGE_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};
