import * as a from '../../constants/auth';

export const authenticateReducer = (state = {}, action) => {
  switch (action.type) {
    case a.AUTHENTICATE:
      return {
        userData: { ...action.payload },
        ...state,
      };
    case a.SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuth: action.payload.isAuth,
      };
    case a.SET_DID_TRY_LOGIN:
      return {
        ...state,
        didTryLogin: action.payload.didTryLogin,
      };
    default:
      return state;
  }
};