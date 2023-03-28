import * as c from '../../constants/conversation';

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

    case c.ADD_CONVERSATION_MESSAGE:
      const newData = { ...state.data };
      newData.results.unshift(action.payload);
      return {
        ...state,
        data: newData, // Append the new message to the existing list
      };
    default:
      return state;
  }
};

export const createConversationReducer = (state = {}, action) => {
  switch (action.type) {
    case c.CREATE_CONVERSATION_REQUEST:
      return { loading: true };

    case c.CREATE_CONVERSATION_SUCCESS:
      return {
        data: { ...action.payload },
      };

    case c.CREATE_CONVERSATION_FAIL:
      return { loading: false, error: action.payload };

    case c.CREATE_CHAT_RESET:
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

    case c.DELETE_CHAT_RESET:
      return {};

    default:
      return state;
  }
};
