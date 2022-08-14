import axios from 'axios';
import * as c from '../../constants/user';

// REGISTER -> pasar el mail y token desde google auth
export const userRegister = (email, password, repeated_password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.USER_REGISTER_REQUEST });

      const config = {
        'Content-Type': 'application/json',
      };

      const { data } = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/users/register/',
        headers: config,
        data: {
          email: email,
          password: password,
          repeated_password: repeated_password,
        },
      });

      dispatch({
        type: c.USER_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.log('ERROR ACTION');
      dispatch({
        type: c.USER_REGISTER_FAIL,
        payload: error,
      });
    }
  };
};

// LOGIN
// TODO: que pasa si el usuario quiere hacer login de nuevo pero ya creo su cuenta, donde quedan guardados los datos?
export const userLogin = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.USER_LOGIN_REQUEST });

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      const { data } = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/users/login/',
        headers: config,
        data: {
          email: email,
          password: password,
        },
      });

      // TODO: if data.has_account is true entonces guardar de nuevo los datos en el localstorage

      dispatch({
        type: c.USER_LOGIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.USER_LOGIN_FAIL,
        payload: error,
      });
    }
  };
};

// LOGOUT -> pasar el mail y token desde google auth
export const logout = (name, email) => {};

// CREATE USER PROFILE
export const createUserProfile = (name, email) => {
  // TODO: save the user in the local storage an
};

// UPDATE USER PROFILE
export const updateUserProfile = () => {};

// GET USER -> get the user for the user profile
export const getUserDetails = () => {};

// DELETE ACCOUNT
export const deleteUser = () => {};
