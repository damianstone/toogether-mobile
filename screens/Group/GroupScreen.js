import React, { useEffect, useState, useCallback, useContext } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { StackActions } from 'react-navigation';
import {
  getGroup,
  leaveGroup,
  removeMember,
  deleteGroup,
} from '../../store/actions/group';
import { Context } from '../../context/ContextProvider';

import Avatar from '../../components/UI/Avatar';
import Loader from '../../components/UI/Loader';
import ActionButton from '../../components/UI/ActionButton';
import * as g from '../../constants/group';
import { checkServerError, check400Error } from '../../utils/errors';
import { getNameInitials, getCardName } from '../../utils/getMethods';

import Colors from '../../constants/Colors';
import ClipBoard from '../../components/UI/ClipBoard';
import MemberAvatar from '../../components/MemberAvatar';

const GroupScreen = (props) => {
  const { groupContext, isOwnerGroup, updateGroupContext } =
    useContext(Context);

  const [refreshing, setRefreshing] = useState(false);
  const { showActionSheetWithOptions } = useActionSheet();
  const dispatch = useDispatch();

  const HEIGHT_ACTION_CONTAINER = isOwnerGroup
    ? { height: '70%' }
    : { height: '60%' };
  const HEIGHT_MEMBER_CARD_CONTAINER = isOwnerGroup
    ? { minHeight: '30%', maxHeight: '30%' }
    : { minHeight: '40%', maxHeight: '45%' };

  const getGroupReducer = useSelector((state) => state.getGroup);
  const {
    loading: loadingGroup,
    error: errorGroup,
    data: dataGroup,
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

  // * this function replaces the first screen on the GroupNavigato stack
  const replaceAction = StackActions.replace({
    routeName: 'StartGroup',
  });

  // we need to kepp calling the group if there is any change made by an external member
  useEffect(() => {
    dispatch(getGroup());
  }, []);

  useEffect(() => {
    if (!groupContext) {
      console.log("replace back");
      props.navigation.dispatch(replaceAction);
    }
  }, [groupContext]);

  // handle render after fetching the group
  useEffect(() => {
    if (errorGroup) {
      if (errorGroup?.response?.status === 400) {
        check400Error(errorGroup);
      }
      checkServerError(errorGroup);
    }
    if (dataGroup) {
      updateGroupContext(dataGroup);
    }
  }, [errorGroup, dataGroup]);

  // handle render after delete the group action
  useEffect(() => {
    if (errorDelete) {
      if (errorDelete?.response?.status === 400) {
        check400Error(errorDelete);
      }
      checkServerError(errorDelete);
    }

    if (dataDelete) {
      updateGroupContext(null);
      dispatch({ type: g.DELETE_GROUP_RESET });
      props.navigation.dispatch(replaceAction);
    }
  }, [errorDelete, dataDelete]);

  // handle render after leave the group
  useEffect(() => {
    if (errorLeave) {
      if (errorLeave?.response?.status === 400) {
        check400Error(errorLeave);
      }
      checkServerError(errorLeave);
    }

    if (dataLeave) {
      updateGroupContext(null);
      dispatch({ type: g.LEAVE_GROUP_RESET });
      props.navigation.dispatch(replaceAction);
    }
  }, [errorLeave, dataLeave]);

  // handle render after remove a member from the group action
  useEffect(() => {
    if (errorRemoveMember) {
      if (errorRemoveMember?.response?.status === 400) {
        check400Error(errorRemoveMember);
      }
      checkServerError(errorRemoveMember);
    }

    if (dataRemoveMember) {
      dispatch(getGroup());
      Alert.alert(`Member removed`, 'You removed one of the members', [
        {
          text: 'OK',
        },
      ]);
      dispatch({ type: g.REMOVE_MEMBER_RESET });
    }
  }, [errorRemoveMember, dataRemoveMember]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', loadGroup);
    return () => {
      if (unsubscribe.remove) {
        unsubscribe.remove();
      }
    };
  }, [loadGroup]);

  const loadGroup = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(getGroup());
    } catch (err) {
      checkServerError(err);
    }
    setRefreshing(false);
  }, [dispatch]);

  const handleDeleteGroup = () => {
    Alert.alert(
      `Are you sure you want to delete this group`,
      'All members will be eliminated automatically',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            if (isOwnerGroup) {
              dispatch(deleteGroup(groupContext.id));
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
            dispatch(leaveGroup(groupContext.id));
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleRemoveMember = (member_id) => {
    if (isOwnerGroup) {
      dispatch(removeMember(groupContext.id, member_id));
    }
  };

  const handleOpenActionSheet = (member_id, member_name) => {
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
            `Are you sure you want to remove ${member_name}`,
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

  if (loadingDelete || loadingLeave) {
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator color={Colors.white} size="large" />
      </View>
    );
  }

  const renderMemberItem = ({ item, index, separators }) => {
    return (
      <View style={styles.flatlist_item_container}>
        <MemberAvatar
          name={item.name}
          photos={item.photos}
          onPress={() =>
            isOwnerGroup ? handleOpenActionSheet(item.id, item.name) : null
          }
        />
        <Text style={styles.name_text}>{getCardName(item.name)}</Text>
      </View>
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.bg }}
      contentContainerStyle={styles.screen}
      nestedScrollEnabled
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={loadGroup}
          tintColor={Colors.white}
        />
      }>
      <View style={{ ...styles.action_view, ...HEIGHT_ACTION_CONTAINER }}>
        <View style={styles.profile_photo_container}>
          {!groupContext && <Loader />}
          {groupContext &&
            groupContext.owner.photos &&
            groupContext.owner.photos.length > 0 && (
              <Image
                source={{
                  uri: `${groupContext.owner.photos[0].image}`,
                }}
                style={{ width: 150, height: 150, borderRadius: 100 }}
              />
            )}
          {(groupContext && !groupContext.owner.photos) ||
            (groupContext?.owner.photos.length === 0 && (
              <View style={styles.avatar_view}>
                <Text style={styles.avatar_initials}>
                  {getNameInitials(groupContext.owner.name)}
                </Text>
              </View>
            ))}
          <View style={styles.nameView}>
            {groupContext?.owner && (
              <Text
                style={
                  styles.name
                }>{`${groupContext.owner.name}'s group`}</Text>
            )}
          </View>
        </View>
        <View style={styles.buttons_container}>
          {isOwnerGroup && groupContext?.share_link && (
            <ClipBoard
              text={groupContext.share_link}
              backgroundColor={Colors.white}
            />
          )}
          {/* <ActionButton
            onPress={() => handleNavigate('Swipe')}
            text="Group chat"
            backgroundColor={Colors.blue}
          /> */}
          {isOwnerGroup && (
            <ActionButton
              onPress={handleDeleteGroup}
              text="Delete group"
              backgroundColor={Colors.orange}
            />
          )}
          {!isOwnerGroup && (
            <ActionButton
              onPress={handleLeaveGroup}
              text="Leave group"
              backgroundColor={Colors.orange}
            />
          )}
        </View>
      </View>
      <View style={{ ...styles.members_view, ...HEIGHT_MEMBER_CARD_CONTAINER }}>
        {groupContext && (
          <FlatList
            style={{ flex: 1 }}
            contentContainerStyle={{
              justifyContent: 'center',
              paddingBottom: 20,
            }}
            nestedScrollEnabled
            horizontal={false}
            numColumns={3}
            data={groupContext.members}
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
  };
};

export default GroupScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%',
    height: '100%',
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
    minWidth: '100%',
    justifyContent: 'center',
    backgroundColor: Colors.bgCard,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    zIndex: -1,
  },
  flatlist_item_container: {
    marginVertical: 15,
    width: '33%',
    height: 70,
    flexDirection: 'column',
    alignItems: 'center',
  },
  name_text: {
    padding: 5,
    width: '100%',
    textAlign: 'center',
    fontSize: 12,
    color: Colors.bg,
  },
});
