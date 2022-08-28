import {
  SWIPE_LIST_REQUEST,
  SWIPE_LIST_SUCCESS,
  SWIPE_LIST_FAIL,
} from '../../constants/swipeConstants';

export const swipeListReducer = (state = { swipes: [] }, action) => {
  switch (action.type) {
    case SWIPE_LIST_REQUEST:
      return { loading: true, swipes: [] };

    case SWIPE_LIST_SUCCESS:
      return {
        loading: false,
        swipes: [...action.payload.profiles],
      };

    case SWIPE_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
