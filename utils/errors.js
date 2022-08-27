import { Alert } from 'react-native';

// funcion that check error that are no coming from the frontend and return a message to the user
export const checkServerError = (
  errorFromServer,
  customTitle,
  customMessage
) => {
  let message = { title: '', message: '' };

  console.log({...errorFromServer});

  if (errorFromServer.response.status === 500) {
    message = {
      title: 'Server error',
      message: errorFromServer.response.status,
    };
  }
  if (errorFromServer.code === 'ERR_NETWORK') {
    message = {
      title: 'Internet Error',
      message: 'Please check your internet connection and try again',
    };
  }
  if (errorFromServer.response.status === 403) {
    message = { title: 'Permission Erron', message: 'Check your data' };
  }
  if (errorFromServer.response.status === 401) {
    message = {
      title: 'Permission Denied',
      message:
        'This can happen for a lot of reasons, please try to login again',
    };
  }
  if (
    errorFromServer.response &&
    errorFromServer.response.data &&
    errorFromServer.response.data.detail !== undefined
  ) {
    message = {
      title: 'An error has occurred',
      message: errorFromServer.response.data.detail,
    };
  }
  if (!errorFromServer) {
    message = { title: '', message: '' };
  }

  return Alert.alert(message.title, message.message, [{ text: 'OK' }]);
};

// return the response of the serializer
export const getFieldErrorFromServer = (
  errorFromServer,
  nameBackendField,
  text
) => {
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
