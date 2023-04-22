import * as a from '../../constants/requestTypes/auth';

export const authenticateReducer = (state = {}, action) => {
  switch (action.type) {
    case a.AUTHENTICATE:
      return {
        isAuth: action.payload.isAuth,
        didTryLogin: true,
      };
    case a.SET_DID_TRY_LOGIN:
      return {
        ...state,
        didTryLogin: action.payload.didTryLogin,
      };
    case a.LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case a.USER_REGISTER_REQUEST:
      return {
        loading: true,
      };
    case a.USER_REGISTER_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case a.USER_REGISTER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case a.USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case a.USER_LOGIN_REQUEST:
      return {
        loading: true,
        success: false,
      };
    case a.USER_LOGIN_SUCCESS:
      return {
        data: { ...action.payload },
        success: true,
      };
    case a.USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case a.USER_LOGIN_RESET:
      return {};
    default:
      return state;
  }
};

export const tokenRefreshReducer = (state = {}, action) => {
  switch (action.type) {
    case a.REFRESH_TOKEN_REQUEST:
      return {
        loading: true,
      };
    case a.REFRESH_TOKEN_SUCCESS:
      return {
        data: { ...action.payload, updated: true },
      };
    default:
      return state;
  }
};
