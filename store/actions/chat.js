import * as c from '../../constants/user';
import * as w from '../../constants/chat';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getEnvVars from '../../environment';

const { API_URL: BASE_URL } = getEnvVars();
//CHAT TEST
export const getUserChatProfile = (profile_id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.USER_GET_CHAT_PROFILE_REQUEST });
      let id;

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };
      const { data } = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/profiles/${profile_id}/`,
        headers: config,
      });

      dispatch({
        type: c.USER_GET_CHAT_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.USER_GET_CHAT_PROFILE_FAIL,
        payload: error,
      });
    }
  };
};

// -------------------------------- CHAT --------------------------------
import chats from '../../data/chats.json';
export const listChats = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: w.LIST_CHATS_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      /* const { data } = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/chats/`,
        headers: config,
      }); */
      const data = chats;

      dispatch({
        type: w.LIST_CHATS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: w.LIST_CHATS_FAIL,
        payload: error,
      });
    }
  };
};

export const getChat = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: w.GET_CHAT_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      /* const { data } = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/chats/${id}`,
        headers: config,
      }); */

      const data = chats.results.find((chat) => chat.id === id);
      dispatch({
        type: w.GET_CHAT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: w.GET_CHAT_FAIL,
        payload: error,
      });
    }
  };
};
export const deleteChat = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: w.DELETE_CHAT_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'delete',
        url: `${BASE_URL}/api/v1/chats/${id}`,
        headers: config,
      });

      dispatch({
        type: w.DELETE_CHAT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: w.DELETE_CHAT_FAIL,
        payload: error,
      });
    }
  };
};
