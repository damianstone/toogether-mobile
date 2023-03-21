import * as c from '../../constants/chat';

export const getReceiverProfile = (state = {}, action) => {
  switch (action.type) {
    case c.GET_RECEIVER_PROFILE_REQUEST:
      return {
        loading: true,
      };
    case c.GET_RECEIVER_PROFILE_SUCCESS:
      return {
        data: { ...action.payload },
      };
    case c.GET_RECEIVER_PROFILE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
// -------------------------------- CHATS --------------------------------
export const listChatsReducer = (state = {}, action) => {
  switch (action.type) {
    case c.LIST_CHATS_REQUEST:
      return { loading: true };

    case c.LIST_CHATS_SUCCESS:
      return {
        data: { ...action.payload },
      };

    case c.LIST_CHATS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const getChatReducer = (state = {}, action) => {
  switch (action.type) {
    case c.GET_CHAT_REQUEST:
      return { loading: true };

    case c.GET_CHAT_SUCCESS:
      return {
        data: { ...action.payload },
      };

    case c.GET_CHAT_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const createChatReducer = (state = {}, action) => {
  switch (action.type) {
    case c.CREATE_CHAT_REQUEST:
      return { loading: true };

    case c.CREATE_CHAT_SUCCESS:
      return {
        data: { ...action.payload },
      };

    case c.CREATE_CHAT_FAIL:
      return { loading: false, error: action.payload };

    case c.CREATE_CHAT_RESET:
      return {};

    default:
      return state;
  }
};

export const deleteChatReducer = (state = {}, action) => {
  switch (action.type) {
    case c.DELETE_CHAT_REQUEST:
      return { loading: true };

    case c.DELETE_CHAT_SUCCESS:
      return {
        data: { ...action.payload },
      };

    case c.DELETE_CHAT_FAIL:
      return { loading: false, error: action.payload };

    case c.DELETE_CHAT_RESET:
      return {};

    default:
      return state;
  }
};
