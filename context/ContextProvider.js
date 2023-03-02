import React, { createContext, useState } from 'react';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [currentProfile, setCurrentProfile] = useState(null);
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
