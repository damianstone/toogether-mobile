import * as g from '../../constants/requestTypes/group';

export const listGroupReducer = (state = {}, action) => {
  switch (action.type) {
    case g.LIST_GROUP_REQUEST:
      return {
        loading: true,
      };
    case g.LIST_GROUP_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case g.LIST_GROUP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case g.LIST_GROUP_RESET:
      return {};
    default:
      return state;
  }
};

export const getGroupReducer = (state = {}, action) => {
  switch (action.type) {
    case g.GET_GROUP_REQUEST:
      return {
        loading: true,
      };
    case g.GET_GROUP_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case g.GET_GROUP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case g.GET_GROUP_RESET:
      return {};
    default:
      return state;
  }
};

export const createGroupReducer = (state = {}, action) => {
  switch (action.type) {
    case g.CREATE_GROUP_REQUEST:
      return {
        loading: true,
      };
    case g.CREATE_GROUP_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case g.CREATE_GROUP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case g.CREATE_GROUP_RESET:
      return {};
    default:
      return state;
  }
};

export const deleteGroupReducer = (state = {}, action) => {
  switch (action.type) {
    case g.DELETE_GROUP_REQUEST:
      return {
        loading: true,
      };
    case g.DELETE_GROUP_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case g.DELETE_GROUP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case g.DELETE_GROUP_RESET:
      return {};
    default:
      return state;
  }
};

export const joinGroupReducer = (state = {}, action) => {
  switch (action.type) {
    case g.JOIN_GROUP_REQUEST:
      return {
        loading: true,
      };
    case g.JOIN_GROUP_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case g.JOIN_GROUP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case g.JOIN_GROUP_RESET:
      return {};
    default:
      return state;
  }
};

export const leaveGroupReducer = (state = {}, action) => {
  switch (action.type) {
    case g.LEAVE_GROUP_REQUEST:
      return {
        loading: true,
      };
    case g.LEAVE_GROUP_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case g.LEAVE_GROUP_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case g.LEAVE_GROUP_RESET:
      return {};
    default:
      return state;
  }
};

export const removeMemberReducer = (state = {}, action) => {
  switch (action.type) {
    case g.REMOVE_MEMBER_REQUEST:
      return {
        loading: true,
      };
    case g.REMOVE_MEMBER_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case g.REMOVE_MEMBER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case g.REMOVE_MEMBER_RESET:
      return {};
    default:
      return state;
  }
};
