import * as c from '../../constants/requestTypes/conversation';

// -------------------------------- CHATS --------------------------------
export const listMyConversationsReducer = (state = {}, action) => {
  switch (action.type) {
    case c.LIST_CONVERSATIONS_REQUEST:
      return { loading: true };

    case c.LIST_CONVERSATIONS_SUCCESS:
      return {
        data: { ...action.payload },
      };

    case c.LIST_CONVERSATIONS_FAIL:
      return { loading: false, error: action.payload };

    case c.LOAD_MORE_CONVERSATIONS_REQUESTS:
      return { ...state, loading: true };

    case c.LOAD_MORE_CONVERSATIONS_SUCCESS:
      // 0 position in the array is the LAST conversation
      return {
        data: {
          ...action.payload,
          results: [...state.data.results, ...action.payload.results],
        },
      };
    case c.LOAD_MORE_CONVERSATIONS_FAIL:
      return { data: state.data, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const listConversationMessagesReducer = (state = {}, action) => {
  switch (action.type) {
    case c.LIST_CONVERSATION_MESSAGES_REQUEST:
      return { loading: true };

    case c.LIST_CONVERSATION_MESSAGES_SUCCESS:
      return {
        data: { ...action.payload },
      };

    case c.LIST_CONVERSATION_MESSAGES_FAIL:
      return { loading: false, error: action.payload };

    case c.LOAD_MORE_MESSAGES_REQUESTS:
      return { ...state, loading: true };

    case c.LOAD_MORE_MESSAGES_SUCCESS:
      // 0 position in the array is the LAST message
      return {
        data: {
          ...action.payload,
          results: [...state.data.results, ...action.payload.results],
        },
      };

    case c.LOAD_MORE_MESSAGES_FAIL:
      return { data: state.data, loading: false, error: action.payload };

    case c.ADD_CONVERSATION_MESSAGE:
      // 0 position in the array is the LAST message
      return {
        data: {
          ...state.data,
          results: [action.payload, ...state.data.results],
        },
      };
    default:
      return state;
  }
};

export const startConversationReducer = (state = {}, action) => {
  switch (action.type) {
    case c.START_CONVERSATION_REQUEST:
      return { loading: true };

    case c.START_CONVERSATION_SUCCESS:
      return {
        data: { ...action.payload },
      };

    case c.START_CONVERSATION_FAIL:
      return { loading: false, error: action.payload };

    case c.START_CONVERSATION_RESET:
      return {};

    default:
      return state;
  }
};

export const deleteConversationReducer = (state = {}, action) => {
  switch (action.type) {
    case c.DELETE_CONVERSATION_REQUEST:
      return { loading: true };

    case c.DELETE_CONVERSATION_SUCCESS:
      return {
        data: { ...action.payload },
      };

    case c.DELETE_CONVERSATION_FAIL:
      return { loading: false, error: action.payload };

    case c.DELETE_CONVERSATION_RESET:
      return {};

    default:
      return state;
  }
};

export const getMyGroupChatReducer = (state = {}, action) => {
  switch (action.type) {
    case c.GET_GROUP_CHAT_REQUEST:
      return { loading: true };

    case c.GET_GROUP_CHAT_SUCCESS:
      return {
        data: { ...action.payload },
      };

    case c.GET_GROUP_CHAT_FAIL:
      return { loading: false, error: action.payload };

    case c.GET_GROUP_CHAT_RESET:
      return {};

    default:
      return state;
  }
};
