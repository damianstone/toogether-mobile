import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';
import * as w from '../../constants/swipe';
import getEnvVars from '../../environment';

const { API_URL: BASE_URL } = getEnvVars();

// -------------------------------- SWIPE CARDS --------------------------------
export const listSwipe = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: w.LIST_SWIPE_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/swipe/`,
        headers: config,
      });

      dispatch({
        type: w.LIST_SWIPE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: w.LIST_SWIPE_FAIL,
        payload: error,
      });
    }
  };
};

// get the current swipe profile that could be as a single profile or a group (show preview porpuses)
export const getSwipeProfile = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: w.GET_SWIPE_PROFILE_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/swipe/${id}/actions/get-swipe-profile/`,
        headers: config,
      });

      dispatch({
        type: w.GET_SWIPE_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: w.GET_SWIPE_PROFILE_FAIL,
        payload: error,
      });
    }
  };
};

// -------------------------------- LIKES --------------------------------
export const listLikes = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: w.LIST_LIKES_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/swipe/actions/get-likes/`,
        headers: config,
      });

      dispatch({
        type: w.LIST_LIKES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: w.LIST_LIKES_FAIL,
        payload: error,
      });
    }
  };
};

export const like = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: w.LIKE_PROFILE_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'post',
        url: `${BASE_URL}/api/v1/swipe/${id}/actions/like/`,
        headers: config,
      });

      dispatch({
        type: w.LIKE_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: w.LIKE_PROFILE_FAIL,
        payload: error,
      });
    }
  };
};

export const removeLike = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: w.REMOVE_LIKE_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'post',
        url: `${BASE_URL}/api/v1/swipe/${id}/actions/remove-like/`,
        headers: config,
      });

      dispatch({
        type: w.REMOVE_LIKE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: w.REMOVE_LIKE_FAIL,
        payload: error,
      });
    }
  };
};

// -------------------------------- MATCHES --------------------------------
export const listMatches = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: w.LIST_MATCH_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/matches/`,
        headers: config,
      });

      dispatch({
        type: w.LIST_MATCH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: w.LIST_MATCH_FAIL,
        payload: error,
      });
    }
  };
};

export const deleteMatch = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: w.DELETE_MATCH_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'delete',
        url: `${BASE_URL}/api/v1/matches/${id}/`,
        headers: config,
      });

      dispatch({
        type: w.DELETE_MATCH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: w.DELETE_MATCH_FAIL,
        payload: error,
      });
    }
  };
};

// -------------------------------- CHAT --------------------------------
import chats from '../../chats.json';
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
