import * as a from '../../constants/auth';


export const authenticate = (userDataObj) => {
  return (dispatch, getState) => {
    dispatch({ type: a.AUTHENTICATE, payload: userDataObj });
  };
};

export const setIsAuth = (flag) => {
  return (dispatch) => {
    dispatch({
      type: a.SET_IS_AUTHENTICATED,
      payload: { isAuth: flag },
    });
  };
};

export const setDidTryLogin = (flag) => {
  return (dispatch) => {
    dispatch({
      type: a.SET_DID_TRY_LOGIN,
      payload: { didTryLogin: flag },
    });
  };
};