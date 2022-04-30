import { AUTHENTICATE, LOGOUT, LOGINS } from '../actions/auth';

const initialState = {
  //token: null,
  //userId: null,
  authenticated: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.accessToken, // store the token
        userId: action.idToken, // store the userId
      };
    case LOGINS:
      return {
        authenticated: action.authenticated,
      };
    case LOGOUT:
      return { authenticated: null }; // reset the state
    default:
      return state;
  }
};
