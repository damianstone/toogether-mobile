import { Platform } from 'react-native';
import Device from '../theme/Device';
import { ENV } from '../environment';

const API_URL = ENV.API_URL;
const MODE = ENV.MODE;

/*
 * This function takes a name as input and returns its initials. If the name is empty or undefined, it returns "N" as the initials.
 * @param {string} name - The name to get initials from
 * @return {string} - The initials of the given name
 */
export const getNameInitials = (name) => {
  const first = name ? name.charAt(0).toUpperCase() : 'N';
  return first;
};

/*
 * This function takes a name as input and returns it. If the name is empty or undefined, it returns "Null" as the card name.
 * @param {string} name - The name to return as the card name
 * @return {string} - The card name to be displayed
 */
export const getCardName = (name) => {
  if (name) {
    return name;
  }
  return 'Null';
};

export const getImage = (backend_image) => {
  let image;
  if (MODE === 'development') {
    image = `${API_URL}${backend_image}`;
  } else {
    image = `${backend_image}`;
  }
  return image;
};
