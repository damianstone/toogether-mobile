import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';
import * as g from '../../constants/requestTypes/group';
import * as c from '../../constants/requestTypes/user';
import { ENV } from '../../environment';

const BASE_URL = ENV.API_URL;

export const listGroup = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: g.LIST_GROUP_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/groups/`,
        headers: config,
      });
      dispatch({
        type: g.LIST_GROUP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: g.LIST_GROUP_FAIL,
        payload: error,
      });
    }
  };
};

export const createGroup = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: g.CREATE_GROUP_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'post',
        url: `${BASE_URL}/api/v1/groups/`,
        headers: config,
      });

      await AsyncStorage.setItem(
        '@groupData',
        JSON.stringify({
          id: data.id,
          owner: data.owner,
          share_link: data.share_link,
        })
      );

      dispatch({
        type: g.CREATE_GROUP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: g.CREATE_GROUP_FAIL,
        payload: error,
      });
    }
  };
};

export const getGroup = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: g.GET_GROUP_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'get',
        url: `${BASE_URL}/api/v1/groups/actions/get-group/`,
        headers: config,
      });

      dispatch({
        type: g.GET_GROUP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: g.GET_GROUP_FAIL,
        payload: error,
      });
    }
  };
};

export const resetData = async () => {
  try {
    await AsyncStorage.removeItem('@groupData');
  } catch (error) {
    console.log(error);
  }
};

export const deleteGroup = (group_id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: g.DELETE_GROUP_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'delete',
        url: `${BASE_URL}/api/v1/groups/${group_id}/`,
        headers: config,
      });

      await AsyncStorage.removeItem('@groupData');

      dispatch({
        type: g.DELETE_GROUP_SUCCESS,
        payload: data,
      });
      dispatch({
        type: g.GET_GROUP_RESET,
      });
      dispatch({
        type: c.USER_GET_PROFILE_RESET,
      });
    } catch (error) {
      dispatch({
        type: g.DELETE_GROUP_FAIL,
        payload: error,
      });
    }
  };
};

export const joinGroup = (share_link) => {
  return async (dispatch) => {
    try {
      dispatch({ type: g.JOIN_GROUP_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'post',
        url: `${BASE_URL}/api/v1/groups/actions/join/`,
        headers: config,
        data: {
          share_link: share_link,
        },
      });

      await AsyncStorage.setItem(
        '@groupData',
        JSON.stringify({
          id: data.id,
          owner: data.owner,
          share_link: data.share_link,
        })
      );

      dispatch({
        type: g.JOIN_GROUP_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: g.JOIN_GROUP_FAIL,
        payload: error,
      });
    }
  };
};

export const leaveGroup = (group_id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: g.LEAVE_GROUP_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'post',
        url: `${BASE_URL}/api/v1/groups/${group_id}/actions/leave/`,
        headers: config,
      });
      await AsyncStorage.removeItem('@groupData');
      dispatch({
        type: g.LEAVE_GROUP_SUCCESS,
        payload: data,
      });
      dispatch({
        type: g.GET_GROUP_RESET,
      });
      dispatch({
        type: c.USER_GET_PROFILE_RESET,
      });
    } catch (error) {
      dispatch({
        type: g.LEAVE_GROUP_FAIL,
        payload: error,
      });
    }
  };
};

export const removeMember = (group_id, member_id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: g.REMOVE_MEMBER_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + userData.token,
      };

      const { data } = await axios({
        method: 'post',
        url: `${BASE_URL}/api/v1/groups/${group_id}/actions/remove-member/`,
        headers: config,
        data: { member_id: member_id },
      });
      dispatch({
        type: g.REMOVE_MEMBER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: g.REMOVE_MEMBER_FAIL,
        payload: error,
      });
    }
  };
};
