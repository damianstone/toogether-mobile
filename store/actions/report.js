import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import * as b from '../../constants/report';
import { ENV } from '../../environment';

const BASE_URL = ENV.API_URL;

export const reportProfile = (id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: b.REPORT_PROFILE_REQUEST });

      const userData = JSON.parse(await AsyncStorage.getItem('@userData'));

      const config = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${userData.token}`,
      };

      const { data } = await axios({
        method: 'POST',
        url: `${BASE_URL}/api/v1/profiles/${id}/actions/report-profile/`,
        headers: config,
      });

      dispatch({
        type: b.REPORT_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: b.REPORT_PROFILE_FAIL,
        payload: error,
      });
    }
  };
};
