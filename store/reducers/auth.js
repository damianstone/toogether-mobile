import { AUTHENTICATE, DELETE, LOGIN } from '../actions/auth';

const initialState = {
  authenticated: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        authenticated: action.authenticated,
      };
    case DELETE:
      return { authenticated: null };
    default:
      return state;
  }
};
