import { AUTHENTICATE, LOGOUT } from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.accessToken, // store the token
        userId: action.idToken, // store the userId
      };
    case LOGOUT:
      return { ...initialState }; // reset the state
    default:
      return state;
  }
};