import GROUPS from '../../data/dummy-data';

const initialState = {
  groups: GROUPS,
};

export default (state = initialState, action) => {
  return {
    ...state
  }
}

