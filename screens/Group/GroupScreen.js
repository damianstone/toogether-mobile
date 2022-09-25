import React, { useEffect, useState, useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { LinearGradient } from 'expo-linear-gradient';
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
import ActionButton from '../../components/UI/ActionButton';
import * as g from '../../constants/group';
import { checkServerError, check400Error } from '../../utils/errors';

import Colors from '../../constants/Colors';
import ClipBoard from '../../components/UI/ClipBoard';
import MemberAvatar from '../../components/MemberAvatar';

const GroupScreen = (props) => {
  const BASE_URL = Constants.manifest.extra.LOCAL_URL;
  const [group, setGroup] = useState();
  const [ownerProfile, setOwnerProfile] = useState();
  const [storedGroupData, setStoredGroupData] = useState();
  const [storedProfileData, setStoredProfileData] = useState();
  const [isOwner, setIsOwner] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();

  const getCurrentProfile = useSelector((state) => state.userGetProfile);
  const {
    loading: loadingGetProfile,
    error: errorGetProfile,
    data: dataGetProfile,
  } = getCurrentProfile;

  const getGroupReducer = useSelector((state) => state.getGroup);
  const {
    loading: loadingGroup,
    error: errorGroup,
    data: groupFromReducer,
  } = getGroupReducer;

  const deleteGroupReducer = useSelector((state) => state.deleteGroup);
  const {
    loading: loadingDelete,
    error: errorDelete,
    data: dataDelete,
  } = deleteGroupReducer;

  const leaveGroupReducer = useSelector((state) => state.leaveGroup);
  const { loading, error, data } = leaveGroupReducer;

  const getAsyncData = async () => {
    try {
      const group = JSON.parse(await AsyncStorage.getItem('@groupData'));
      const profile = JSON.parse(await AsyncStorage.getItem('@userData'));

      if (group !== null) {
        setStoredGroupData(group);
      }
      if (profile !== null) {
        setStoredProfileData(profile);
      }
      if (!group) {
        props.navigation.navigate('Swipe');
      }
    } catch (e) {
      console.log(e);
      props.navigation.navigate('Swipe');
    }
  };

  useEffect(() => {
    getAsyncData();
    dispatch(getGroup());
  }, []);

  // TODO: checking ownership
  useEffect(() => {
    if (storedGroupData && !ownerProfile) {
      // TODO: call the owner profile using the id
      dispatch(getUserProfile());
      dispatch(getGroup());
    }

    if (!groupFromReducer) {
      dispatch(getGroup());
    }

    if (groupFromReducer) {
      setGroup(groupFromReducer);
    }

    if (dataGetProfile) {
      setOwnerProfile(dataGetProfile);
    }

    // TODO: check if the current user is owner
    if (
      storedGroupData &&
      storedProfileData &&
      storedGroupData.owner === storedProfileData.id
    ) {
      setIsOwner(true);
    }
  }, [storedGroupData, storedProfileData, dataGetProfile]);

  const loadProfile = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(getUserProfile());
    } catch (err) {
      checkServerError(err);
    }
    setRefreshing(false);
  }, [dispatch]);

  // add listener to fetch the user and re fetch it
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {
      loadProfile();
    });
    return unsubscribe;
  }, [loadProfile]);

  // TODO: useEffect to handle actions
  useEffect(() => {}, []);

  // TODO: navigate to the group chat
  const handleNavigate = (screen) => {
    return props.navigation.navigate(screen);
  };

  // TODO: delete group
  const handleDeleteGroup = () => {
    if (isOwner) {
      dispatch(deleteGroup());
    }
  };

  // TODO: leave group
  const handleLeaveGroup = () => {
    dispatch(leaveGroup(storedGroupData.id));
  };

  // TODO: remove member
  const handleRemoveMember = (member_id) => {
    if (isOwner) {
      dispatch(removeMember(storedGroupData.id, member_id));
    }
  };

  // if (loadingGroup || loadingGetProfile) {
  //   return (
  //     <View style={styles.loadingScreen}>
  //       <ActivityIndicator color={Colors.orange} size="large" />
  //     </View>
  //   );
  // }

  const renderMemberItem = ({ item, index, separators }) => {
    // TODO: display everyone except the owner
    if (item.id === ownerProfile.id) {
      return null;
    }
    return (
      <View style={styles.flatlist_item_container}>
        <MemberAvatar photos={item.photos} onPress={() => {}} />
        <Text
          style={{
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          {item.firstname}
        </Text>
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
      <View style={styles.action_view}>
        <View style={styles.profile_photo_container}>
          {ownerProfile?.photos && ownerProfile?.photos.length > 0 && (
            <Image
              source={{
                uri: `${BASE_URL}${ownerProfile.photos[0].image}`,
              }}
              style={{ width: 150, height: 150, borderRadius: 100 }}
            />
          )}
          {!ownerProfile?.photos ||
            (ownerProfile?.photos.length === 0 && (
              <View style={styles.avatar_view}>
                <Text style={styles.avatar_initials}>DS</Text>
              </View>
            ))}
        </View>
        <View style={styles.nameView}>
          {ownerProfile && (
            <Text style={styles.name}>
              {`${ownerProfile.firstname}'s group`}
            </Text>
          )}
        </View>
        <View style={styles.buttons_container}>
          {isOwner && storedGroupData && (
            <ClipBoard
              text={storedGroupData.share_link}
              backgroundColor={Colors.white}
            />
          )}
          <ActionButton
            onPress={() => {}}
            text="Group chat"
            backgroundColor={Colors.orange}
          />
          {isOwner && (
            <ActionButton
              onPress={() => {}}
              text="Delete group"
              backgroundColor={Colors.orange}
            />
          )}
          {!isOwner && (
            <ActionButton
              onPress={() => {}}
              text="Leave group"
              backgroundColor={Colors.orange}
            />
          )}
        </View>
      </View>
      <View style={styles.members_view}>
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
    width: '100%',
    minHeight: '60%',
  },
  profile_photo_container: {
    marginTop: 20,
    alignItems: 'center',
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
    flexDirection: 'row',
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
    width: '90%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  members_view: {
    width: '100%',
    minHeight: '30%',
    maxHeight: '40%',
    backgroundColor: Colors.bgCard,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
  },
  flatlist_item_container: {
    width: 50,
    height: 50,
    alignItems: 'center',
  },
});
