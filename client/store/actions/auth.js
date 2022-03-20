export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';

// SIGN UP WITH FIREBASE
export const signup = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      // request to create a new user
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAeTJYg-SmUKrM0Alclkyc6abG2xS-lPeE',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData); // log the object with the info of the error
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';

      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email exists already!';
      }
      
      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: SIGNUP,
    });
  };
};

// SIGN IN WITH FIREBASE
export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      // request to create a new user
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAeTJYg-SmUKrM0Alclkyc6abG2xS-lPeE',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      console.log(errorResData); // log the object with the info of the error
      const errorId = errorResData.error.message;
      let message = 'Something went wrong!';

      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
      } else if (errorId === 'USER_DISABLED') {
        message = 'This user has been disabled!';
      }

      throw new Error(message);
    }

    const resData = await response.json();
    console.log(resData);

    dispatch({
      type: SIGNIN,
    });
  };
};
