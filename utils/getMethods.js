export const getNameInitials = (name) => {
  const first = name ? name.charAt(0).toUpperCase() : 'N';
  return first;
};

export const getCardName = (name) => {
  if (name) {
    return name;
  }
  return 'Null';
};