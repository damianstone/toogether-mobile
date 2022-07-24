import axios from 'axios';
import {
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
} from '../../constants/userConstants';

// REGISTER -> pasar el mail y token desde google auth
export const register = (name, email) => async (dispatch) => {};

// GET USER -> get the user for the user profile
export const getUserDetails = () => async (dispatch) => {};

// CREATE USER PROFILE
export const createUserProfile = (name, email) => async (dispatch) => {};

// UPDATE USER PROFILE
export const updateUserProfile = () => async (dispatch) => {};

// DELETE ACCOUNT
export const deleteUser = () => async (dispatch) => {};
