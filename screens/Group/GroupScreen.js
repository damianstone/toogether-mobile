/* eslint-disable no-promise-executor-return */
import React, { useEffect, useState, useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';
import Constants from 'expo-constants';
import {
  getGroup,
  leaveGroup,
  removeMember,
  deleteGroup,
} from '../../store/actions/group';
import { getUserProfile } from '../../store/actions/user';

import HeaderButtom from '../../components/UI/HeaderButton';
import Avatar from '../../components/UI/Avatar';
import Loader from '../../components/UI/Loader';
import ActionButton from '../../components/UI/ActionButton';
import * as g from '../../constants/group';
import { checkServerError, check400Error } from '../../utils/errors';

import Colors from '../../constants/Colors';
import ClipBoard from '../../components/UI/ClipBoard';
import MemberAvatar from '../../components/MemberAvatar';

const GroupScreen = (props) => {
  const BASE_URL = Constants.manifest.extra.LOCAL_URL;
  const [storedGroupData, setStoredGroupData] = useState();
  const [storedProfileData, setStoredProfileData] = useState();
  const [isOwner, setIsOwner] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { showActionSheetWithOptions } = useActionSheet();
  const dispatch = useDispatch();

  const HEIGHT_ACTION_CONTAINER = isOwner
    ? { height: '70%' }
    : { height: '60%' };
  const HEIGHT_MEMBER_CARD_CONTAINER = isOwner
    ? { minHeight: '30%', maxHeight: '35%' }
    : { minHeight: '40%', maxHeight: '45%' };

  const getProfileReducer = useSelector((state) => state.userGetProfile);
  const {
    loading: loadingGetProfile,
    error: errorGetProfile,
    data: ownerProfile,
  } = getProfileReducer;

  const getGroupReducer = useSelector((state) => state.getGroup);
  const {
    loading: loadingGroup,
    error: errorGroup,
    data: group,
  } = getGroupReducer;

  const deleteGroupReducer = useSelector((state) => state.deleteGroup);
  const {
    loading: loadingDelete,
    error: errorDelete,
    data: dataDelete,
  } = deleteGroupReducer;

  const leaveGroupReducer = useSelector((state) => state.leaveGroup);
  const {
    loading: loadingLeave,
    error: errorLeave,
    data: dataLeave,
  } = leaveGroupReducer;

  const removeMemberReducer = useSelector((state) => state.removeMember);
  const {
    loading: loadingRemoveMember,
    error: errorRemoveMember,
    data: dataRemoveMember,
  } = removeMemberReducer;

  // https://start.the.night/mphHZJT8EpvJECXbyDKqVd

  const getAsyncData = async () => {
    let group;
    let profile;
    try {
      group = JSON.parse(await AsyncStorage.getItem('@groupData'));
      profile = JSON.parse(await AsyncStorage.getItem('@userData'));

      if (!group || !profile) {
        props.navigation.navigate('Swipe');
      }
      if (group !== null && profile !== null) {
        setStoredGroupData(group);
        setStoredProfileData(profile);
      }
    } catch (e) {
      console.log(e);
      props.navigation.navigate('Swipe');
    }
  };

  // TODO: get async stored data
  useEffect(() => {
    getAsyncData();
  }, []);

  // TODO: checking ownership
  useEffect(() => {
    if (storedGroupData && !ownerProfile) {
      dispatch(getUserProfile(storedGroupData.owner));
    }

    if (!group) {
      dispatch(getGroup());
    }

    if (errorGroup) {
      if (errorGroup?.response?.status === 400) {
        check400Error(errorGroup);
      }
      checkServerError(errorGroup);
    }

    if (errorGetProfile) {
      if (errorGetProfile?.response?.status === 400) {
        check400Error(errorGetProfile);
      }
      checkServerError(errorGetProfile);
    }

    // TODO: check if the current user is owner
    if (
      storedGroupData &&
      storedProfileData &&
      storedGroupData.owner === storedProfileData.id
    ) {
      setIsOwner(true);
    }
  }, [
    dispatch,
    errorGroup,
    errorGetProfile,
    storedGroupData,
    storedProfileData,
  ]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      loadProfile();
    });
    return unsubscribe;
  }, [loadProfile]);

  // TODO: useEffect to handle actions
  useEffect(() => {
    if (errorDelete) {
      if (errorDelete?.response?.status === 400) {
        check400Error(errorDelete);
      }
      checkServerError(errorDelete);
    }

    if (errorLeave) {
      if (errorLeave?.response?.status === 400) {
        check400Error(errorLeave);
      }
      checkServerError(errorLeave);
    }

    if (errorRemoveMember) {
      if (errorRemoveMember?.response?.status === 400) {
        check400Error(errorRemoveMember);
      }
      checkServerError(errorRemoveMember);
    }

    if (dataDelete) {
      dispatch({ type: g.DELETE_GROUP_RESET });
      props.navigation.navigate('StartGroup');
    }

    if (dataLeave) {
      dispatch({ type: g.LEAVE_GROUP_RESET });
      props.navigation.navigate('StartGroup');
    }

    if (dataRemoveMember) {
      Alert.alert(`Member removed`, 'You removed one of the members', [
        {
          text: 'OK',
        },
      ]);
      dispatch({ type: g.REMOVE_MEMBER_RESET });
    }
  }, [
    errorDelete,
    dataDelete,
    errorLeave,
    dataLeave,
    errorRemoveMember,
    dataRemoveMember,
  ]);

  const loadProfile = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(getUserProfile(storedGroupData.owner));
      await dispatch(getGroup());
    } catch (err) {
      checkServerError(err);
    }
    setRefreshing(false);
  }, [dispatch]);

  const handleNavigate = (screen) => {
    return props.navigation.navigate(screen);
  };

  const handleDeleteGroup = () => {
    Alert.alert(
      `Are you sure you want to delete this group`,
      'All members will be eliminated automatically',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Leave',
          onPress: () => {
            if (isOwner && storedGroupData?.id) {
              dispatch(deleteGroup(storedGroupData.id));
              setStoredGroupData();
              setStoredProfileData();
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleLeaveGroup = () => {
    Alert.alert(
      `Are you sure you want to leave this group`,
      'This action is irreversible',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Leave',
          onPress: () => {
            dispatch(leaveGroup(storedGroupData.id));
            setStoredGroupData();
            setStoredProfileData();
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleRemoveMember = (member_id) => {
    if (isOwner) {
      dispatch(removeMember(storedGroupData.id, member_id));
    }
  };

  const handleOpenActionSheet = (member_id, member_firstname) => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = ['Remove member', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 1;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          Alert.alert(
            `Are you sure you want to remove ${member_firstname}`,
            'This action is irreversible',
            [
              {
                text: 'Cancel',
              },
              {
                text: 'Yes',
                onPress: () => {
                  handleRemoveMember(member_id);
                },
                style: 'destructive',
              },
            ]
          );
        }
        return null;
      }
    );
  };

  const getInitials = (firstname, lastname) => {
    const first = firstname ? firstname.charAt(0).toUpperCase : 'N';
    const second = lastname ? lastname.charAt(0).toUpperCase : 'N';
    return first + second;
  };

  if (loadingDelete || loadingLeave) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator color={Colors.orange} size="large" />
      </View>
    );
  }

  const renderMemberItem = ({ item, index, separators }) => {
    if (ownerProfile && item.id === ownerProfile.id) {
      return null;
    }
    return (
      <View style={styles.flatlist_item_container}>
        <MemberAvatar
          photos={item.photos}
          onPress={() =>
            isOwner ? handleOpenActionSheet(item.id, item.firstname) : null
          }
        />
        <Text style={styles.firstname_text}>{item.firstname}</Text>
      </View>
    );
  };

  return (
    <ScrollView
      style={{ backgroundColor: Colors.bg, flex: 1 }}
      contentContainerStyle={styles.screen}
      nestedScrollEnabled
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={loadProfile}
          tintColor={Colors.white}
        />
      }>
      <View style={{ ...styles.action_view, ...HEIGHT_ACTION_CONTAINER }}>
        <View style={styles.profile_photo_container}>
          {ownerProfile &&
            ownerProfile.photos &&
            ownerProfile.photos.length > 0 && (
              <Image
                source={{
                  uri: `${BASE_URL}${ownerProfile.photos[0].image}`,
                }}
                style={{ width: 150, height: 150, borderRadius: 100 }}
              />
            )}
          {(ownerProfile && !ownerProfile.photos) ||
            (ownerProfile?.photos.length === 0 && (
              <View style={styles.avatar_view}>
                <Text style={styles.avatar_initials}>
                  {getInitials(ownerProfile.firstname, ownerProfile.lastname)}
                </Text>
              </View>
            ))}
          {!ownerProfile && <Loader />}
          <View style={styles.nameView}>
            {ownerProfile && (
              <Text style={styles.name}>
                {`${ownerProfile.firstname}'s group`}
              </Text>
            )}
          </View>
        </View>
        <View style={styles.buttons_container}>
          {isOwner && group?.share_link && (
            <ClipBoard text={group.share_link} backgroundColor={Colors.white} />
          )}
          <ActionButton
            onPress={() => handleNavigate('Swipe')}
            text="Group chat"
            backgroundColor={Colors.blue}
          />
          {isOwner && (
            <ActionButton
              onPress={handleDeleteGroup}
              text="Delete group"
              backgroundColor={Colors.orange}
            />
          )}
          {!isOwner && (
            <ActionButton
              onPress={handleLeaveGroup}
              text="Leave group"
              backgroundColor={Colors.orange}
            />
          )}
        </View>
      </View>
      <View style={{ ...styles.members_view, ...HEIGHT_MEMBER_CARD_CONTAINER }}>
        {group && (
          <FlatList
            nestedScrollEnabled
            data={group.members}
            renderItem={renderMemberItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </ScrollView>
  );
};

GroupScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Group',
    headerLeft: () => (
      <Avatar
        onPress={() => {
          navData.navigation.navigate('MyProfile');
        }}
      />
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-arrow-back'}
          onPress={() => {
            navData.navigation.navigate('Swipe');
          }}
          title="Back arrow"
        />
      </HeaderButtons>
    ),
  };
};

export default GroupScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  loadingScreen: {
    backgroundColor: Colors.bg,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  action_view: {
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  profile_photo_container: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar_view: {
    backgroundColor: Colors.orange,
    width: 120,
    height: 120,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar_initials: {
    color: Colors.white,
    fontSize: 25,
  },
  nameView: {
    width: '100%',
    marginTop: -5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginRight: 10,
    color: Colors.white,
    padding: 10,
  },
  buttons_container: {
    marginTop: 20,
    flexDirection: 'column',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  members_view: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: Colors.bgCard,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
  },
  firstname_text: {
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 12,
    color: Colors.bg,
  },
  flatlist_item_container: {
    width: 70,
    height: 70,
    alignItems: 'center',
  },
});
