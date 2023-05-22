import * as b from '../../constants/requestTypes/block';

export const listBlockedProfilesReducer = (state = {}, action) => {
  switch (action.type) {
    case b.LIST_BLOCKED_PROFILES_REQUEST:
      return {
        loading: true,
      };
    case b.LIST_BLOCKED_PROFILES_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case b.LIST_BLOCKED_PROFILES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const blockProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case b.BLOCK_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case b.BLOCK_PROFILE_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case b.BLOCK_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case b.BLOCK_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const unBlockProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case b.DISBLOCK_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case b.DISBLOCK_PROFILE_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case b.DISBLOCK_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case b.DISBLOCK_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};
