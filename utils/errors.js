import { Alert } from 'react-native';

/*
 * This function takes in an errorFromServer object as a parameter and checks for specific types of errors from the backend. It returns an alert object to be displayed if an error is found, otherwise it returns null.
 * @param {object} errorFromServer - The error object returned from the server
 * @return {object|null} - An alert object if an error is found, otherwise null
 */
export const checkServerError = (errorFromServer) => {
  let message = { title: '', message: '' };

  if (
    errorFromServer &&
    errorFromServer.response &&
    errorFromServer.code === 'ERR_NETWORK'
  ) {
    message = {
      title: 'Internet Error',
      message: 'Please check your internet connection and try again',
    };
  }

  if (
    errorFromServer &&
    errorFromServer.response &&
    errorFromServer.response.status === 500
  ) {
    message = {
      title: 'Server error',
      message: errorFromServer.response.status,
    };
  }

  if (
    errorFromServer &&
    errorFromServer.response &&
    errorFromServer.response.status === 403
  ) {
    message = { title: 'Permission Error', message: 'Check your data' };
  }
  if (
    errorFromServer &&
    errorFromServer.response &&
    errorFromServer.response.status === 401
  ) {
    message = {
      title: 'Permission Denied',
      message:
        'This can happen for a lot of reasons, please try to login again',
    };
  }

  if (!errorFromServer) {
    return null;
  }

  if (!message.title && !message.message) {
    return null;
  }

  return errorFromServer
    ? Alert.alert(message.title, message.message, [{ text: 'OK' }])
    : null;
};

/*
 * This function takes in an errorFromServer and nameBackendField as parameters and checks for a specific type of error from the backend. It returns an error message to be displayed in the form of an alert if the error is found, otherwise it returns null.
 * @param {object} errorFromServer - The error object returned from the server
 * @param {string} nameBackendField - The name of the backend field to check for errors
 * @return {object|null} - An alert object if an error is found, otherwise null
 */
export const check400Error = (errorFromServer, nameBackendField) => {
  let message = { title: '', message: '' };

  if (
    errorFromServer.response &&
    errorFromServer?.response?.data &&
    errorFromServer?.response?.data?.detail
  ) {
    message = {
      title: 'An error has occurred',
      message: errorFromServer.response.data.detail,
    };
  }

  if (
    errorFromServer.response &&
    errorFromServer.response?.hasOwnProperty('data') &&
    errorFromServer.response?.data?.hasOwnProperty('non_field_errors')
  ) {
    message = {
      title: 'An error has occurred',
      message: errorFromServer.response.data.non_field_errors[0],
    };
  }

  if (
    errorFromServer &&
    nameBackendField &&
    errorFromServer.response !== undefined &&
    errorFromServer.response.data !== undefined &&
    errorFromServer.response.data[nameBackendField] !== undefined
  ) {
    message = {
      title: `Error with ${nameBackendField}`,
      message: errorFromServer.response.data[nameBackendField][0],
    };
  }

  if (!message.title && !message.message) {
    return null;
  }

  return errorFromServer
    ? Alert.alert(message.title, message.message, [{ text: 'OK' }])
    : null;
};

/*
 * This function takes in an errorFromServer and nameBackendField as parameters and extracts an error message associated with a specific backend field if it exists. It returns the error message if found, otherwise it returns an empty string.
 * @param {object} errorFromServer - The error object returned from the server
 * @param {string} nameBackendField - The name of the backend field to extract the error message from
 * @return {string} - The error message if found, otherwise an empty string
 */
export const getFieldErrorFromServer = (errorFromServer, nameBackendField) => {
  if (
    errorFromServer &&
    errorFromServer.response !== undefined &&
    errorFromServer.response.data !== undefined &&
    errorFromServer.response.data[nameBackendField] !== undefined
  ) {
    return errorFromServer.response.data[nameBackendField][0];
  }

  return '';
};
