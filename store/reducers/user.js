import axios from 'axios';
import * as c from '../../constants/user';

// REGISTER REDUCER
export const userRegisterReducer = (state = { data: {} }, action) => {
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

// REGISTER REDUCER
// TODO: que pasa si el usuario quiere hacer login de nuevo pero ya creo su cuenta, donde quedan guardados los datos?
export const userLoginReducer = (state = { data: {} }, action) => {
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
