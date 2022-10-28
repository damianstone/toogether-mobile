import * as c from '../../constants/user';

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

// -------------------------------- LOGIN / REGISTER REDUCERS --------------------------------
export const authenticateReducer = (state = {}, action) => {
  switch (action.type) {
    case c.AUTHENTICATE:
      return {
        userData: { ...action.payload },
      };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case c.USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case c.USER_REGISTER_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case c.USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case c.USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case c.USER_LOGIN_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case c.USER_LOGIN_SUCCESS:
      return {
        data: { ...action.payload },
        success: true,
      };
    case c.USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case c.USER_LOGIN_RESET:
      return {};
    default:
      return state;
  }
};

export const tokenRefreshReducer = (state = {}, action) => {
  switch (action.type) {
    case c.REFRESH_TOKEN_REQUEST:
      return {
        loading: true,
      };
    case c.REFRESH_TOKEN_SUCCESS:
      return {
        data: { ...action.payload, updated: true },
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
