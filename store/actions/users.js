const NEW_USER = 'NEW_USER';
const UPDATE_USER = 'UPDATE_USER';
const DELETE_USER = 'DELETE_USER';

export const newUser = (
  name,
  lastname,
  university,
  age,
  gender,
  show,
  description,
  photo,
) => {
  return (dispatch) => {
    // send the new user data to firebase
    dispatch({
      type: NEW_USER,
      userData: {
        name,
        lastname,
        university,
        age,
        gender,
        show,
        description,
        location: 'vitacura',
        photo, 
      },
    });
  };
};

