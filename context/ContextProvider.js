import React, { createContext, useState } from 'react';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  // TODO: implement the current profile context around the app
  const [currentProfile, setCurrentProfile] = useState({
    is_in_group: false,
    group_owner: false,
  });
  const [groupState, setGroupState] = useState(null);

  const updateCurrentProfile = (profileInfo) => {
    setCurrentProfile(profileInfo);
  };

  const updateGroupState = (groupInfo) => {
    setGroupState(groupInfo);
  };

  return (
    <Context.Provider
      value={{
        groupState,
        updateGroupState,
        currentProfile,
        updateCurrentProfile,
      }}>
      {children}
    </Context.Provider>
  );
};
