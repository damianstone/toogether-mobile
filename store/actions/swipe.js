import {
  SWIPE_LIST_REQUEST,
  SWIPE_LIST_SUCCESS,
  SWIPE_LIST_FAIL,
} from '../../constants/swipe';
import axios from 'axios';

// GET THE PRODUCTS
export const listSwipes =
  (keyword = '') =>
  async (dispatch) => {
    try {
      dispatch({ type: SWIPE_LIST_REQUEST });

      const { data } = await axios.get(
        `http://127.0.0.1:8000/api/profiles${keyword}`
      );

      dispatch({
        type: SWIPE_LIST_SUCCESS,
        payload: data, //. the payload is the entire data
      });
    } catch (error) {
      dispatch({
        type: SWIPE_LIST_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
