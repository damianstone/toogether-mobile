import React, { createContext, useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../store/actions/user';
import { getGroup } from '../store/actions/group';
import { exist } from '../utils/checks';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [profileContext, setProfileContext] = useState(null);
  const [groupContext, setGroupContext] = useState(null);
  const [isOwnerGroup, setIsOwnerGroup] = useState(null);

  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userGetProfile);
  const { data: dataProfile } = userProfile;

  const getGroupReducer = useSelector((state) => state.getGroup);
  const { data: dataGroup } = getGroupReducer;

  const updateProfileContext = (profileInfo) => {
    setProfileContext(profileInfo);
  };

  const updateGroupContext = (groupInfo) => {
    if (groupInfo?.detail === 'NO_GROUP') {
      setGroupContext(null);
      return;
    }
    // check if the user created the group to make available admin actions
    if (exist(groupInfo) && profileContext.id === groupInfo.owner.id) {
      setIsOwnerGroup(true);
    }
    setGroupContext(groupInfo);
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getUserProfile());
      await dispatch(getGroup());
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (dataProfile) {
      updateProfileContext(dataProfile);
    }
    if (dataGroup) {
      updateGroupContext(dataGroup);
    }
  }, [dataProfile, dataGroup]);

  // memoize the full context value
  const contextValue = useMemo(
    () => ({
      profileContext,
      groupContext,
      isOwnerGroup,
      updateProfileContext,
      updateGroupContext,
    }),
    [profileContext, groupContext, updateGroupContext, updateGroupContext]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
