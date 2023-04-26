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
      const newNext = action.payload.next;
      const oldData = { ...state.data };
      const newConversations = [...action.payload.results];
      const newData = {
        ...state.data,
        results: [...newConversations, ...oldData.results],
        next: newNext,
      };
      return {
        ...state,
        data: newData,
        loading: false,
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
      const newNext = action.payload.next;
      const oldData = { ...state.data };
      const newMessages = [...action.payload.results];
      const newData2 = {
        ...state.data,
        results: [...newMessages, ...oldData.results],
        next: newNext,
      };
      return {
        ...state,
        data: newData2,
        loading: false,
      };

    case c.LOAD_MORE_MESSAGES_FAIL:
      return { data: state.data, loading: false, error: action.payload };

    case c.ADD_CONVERSATION_MESSAGE:
      const newData = { ...state.data };
      newData.results.unshift(action.payload);
      return {
        ...state,
        data: newData,
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
