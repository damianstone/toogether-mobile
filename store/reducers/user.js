import * as c from '../../constants/user';

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case c.USER_REGISTER_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case c.USER_REGISTER_SUCCESS:
      return {
        data: { ...action.payload },
        success: true,
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

export const userListPhotosReducer = (state = {}, action) => {
  switch (action.type) {
    case c.USER_LIST_PHOTOS_REQUEST:
      return {
        loading: true,
      };
    case c.USER_LIST_PHOTOS_SUCCESS:
      return {
        data: { ...action.payload },
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

// GET USER DETAILS
export const getUserDetailsReducer = (state = {}, action) => {
  switch (action.type) {
  }
};

// UPDATE USER
export const updateUserReducer = (state = {}, action) => {
  switch (action.type) {
  }
};

// DELETE USER
export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
  }
};
