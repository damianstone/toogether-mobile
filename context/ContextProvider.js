import React, { createContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../store/actions/user';
import { getGroup } from '../store/actions/group';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [profileContext, setProfileContext] = useState(null);
  const [groupContext, setGroupContext] = useState(null);

  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userGetProfile);
  const { data: dataProfile } = userProfile;

  const getGroupReducer = useSelector((state) => state.getGroup);
  const { data: dataGroup } = getGroupReducer;

  const updateProfileContext = (profileInfo) => {
    setProfileContext(profileInfo);
  };

  const updateGroupContext = (groupInfo) => {
    setGroupContext(groupInfo);
  };

  // * Profile
  useEffect(() => {
    if (!dataProfile && !profileContext) {
      dispatch(getUserProfile());
    }
    if (dataProfile) {
      updateProfileContext(dataProfile);
    }
  }, []);

  // * Group
  useEffect(() => {
    if (!dataGroup && !groupContext) {
      dispatch(getGroup());
    }
    if (dataGroup) {
      console.log("DATA GROUP", dataGroup)
      updateGroupContext(dataGroup);
    }
  }, []);

  return (
    <Context.Provider
      value={{
        groupContext,
        updateGroupContext,
        profileContext,
        updateProfileContext,
      }}>
      {children}
    </Context.Provider>
  );
};
