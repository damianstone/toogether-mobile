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