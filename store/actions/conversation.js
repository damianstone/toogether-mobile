import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as c from '../../constants/requestTypes/conversation';
import { ENV } from '../../environment';

const BASE_URL = ENV.API_URL;

// -------------------------------- CHAT (1-1) --------------------------------
export const listMyConversations = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.LIST_CONVERSATIONS_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };
      const { data } = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/conversations/`,
        headers: config,
      });
      dispatch({
        type: c.LIST_CONVERSATIONS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.LIST_CONVERSATIONS_FAIL,
        payload: error,
      });
    }
  };
};

export const listMessages = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.LIST_CONVERSATION_MESSAGES_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));
      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/conversations/${id}/messages/`,
        headers: config,
      });

      dispatch({
        type: c.LIST_CONVERSATION_MESSAGES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.LIST_CONVERSATION_MESSAGES_FAIL,
        payload: error,
      });
    }
  };
};

export const addConversationMessage = (messages) => (dispatch) => {
  dispatch({ type: c.ADD_CONVERSATION_MESSAGE, payload: messages });
};

export const deleteConversation = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.DELETE_CONVERSATION_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'delete',
        url: `${BASE_URL}/api/v1/conversations/${id}/`,
        headers: config,
      });

      dispatch({
        type: c.DELETE_CONVERSATION_SUCCESS,
        payload: data,
      });

      dispatch({ type: c.DELETE_CONVERSATION_RESET });
    } catch (error) {
      dispatch({
        type: c.DELETE_CONVERSATION_FAIL,
        payload: error,
      });
    }
  };
};

export const startConversation = (matchId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.START_CONVERSATION_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'POST',
        url: `${BASE_URL}/api/v1/conversations/${matchId}/start/`,
        headers: config,
      });
      dispatch({
        type: c.START_CONVERSATION_SUCCESS,
        payload: data,
      });
      dispatch({ type: c.START_CONVERSATION_RESET });
    } catch (error) {
      dispatch({
        type: c.START_CONVERSATION_FAIL,
        payload: error,
      });
    }
  };
};

// -------------------------------- GROUP CHAT--------------------------------

export const getMyGroupChat = (groupId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.GET_GROUP_CHAT_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };
      const { data } = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/group-chat/${groupId}/`,
        headers: config,
      });
      dispatch({
        type: c.GET_GROUP_CHAT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.GET_GROUP_CHAT_FAIL,
        payload: error,
      });
    }
  };
};

export const listGroupMessages = (groupId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.LIST_CONVERSATION_MESSAGES_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };
      const { data } = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/group-chat/${groupId}/messages/`,
        headers: config,
      });
      dispatch({
        type: c.LIST_CONVERSATION_MESSAGES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.LIST_CONVERSATION_MESSAGES_FAIL,
        payload: error,
      });
    }
  };
};

// -------------------------------- PAGINATION --------------------------------

export const loadMoreConversations = (url) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.LOAD_MORE_CONVERSATIONS_REQUESTS });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'get',
        url: url,
        headers: config,
      });

      dispatch({
        type: c.LOAD_MORE_CONVERSATIONS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.LOAD_MORE_CONVERSATIONS_FAIL,
        payload: error,
      });
    }
  };
};

export const loadMoreMessages = (url) => {
  return async (dispatch) => {
    try {
      dispatch({ type: c.LOAD_MORE_MESSAGES_REQUESTS });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'get',
        url: url,
        headers: config,
      });

      dispatch({
        type: c.LOAD_MORE_MESSAGES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: c.LOAD_MORE_MESSAGES_FAIL,
        payload: error,
      });
    }
  };
};
