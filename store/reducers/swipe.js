import * as w from '../../constants/swipe';

export const listSwipeReducer = (state = {}, action) => {
  switch (action.type) {
    case w.LIST_SWIPE_REQUEST:
      return { loading: true };

    case w.LIST_SWIPE_SUCCESS:
      return {
        data: { ...action.payload },
      };

    case w.LIST_SWIPE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getCurrentSwipeProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case w.GET_CURRENT_SWIPE_PROFILE_REQUEST:
      return { loading: true };

    case w.GET_CURRENT_SWIPE_PROFILE_SUCCESS:
      return {
        data: { ...action.payload },
      };

    case w.GET_CURRENT_SWIPE_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
