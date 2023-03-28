import * as b from '../../constants/report';

export const reportProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case b.REPORT_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case b.REPORT_PROFILE_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case b.REPORT_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case b.REPORT_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
