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
      console.log("ERROR ACTION")
      dispatch({
        type: c.USER_REGISTER_FAIL,
        payload: error,
      });
    }
  };
};

// LOGIN -> pasar el mail y token desde google auth
export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.USER_LOGIN_REQUEST });

      //TODO: pass the user token

      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/users/register/`,
        { email, password }
      );

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
export const createUserProfile = (name, email) => {};

// UPDATE USER PROFILE
export const updateUserProfile = () => {};

// GET USER -> get the user for the user profile
export const getUserDetails = () => {};

// DELETE ACCOUNT
export const deleteUser = () => {};
