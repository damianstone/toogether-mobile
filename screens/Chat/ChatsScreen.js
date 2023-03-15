import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { exist } from '../../utils/checks';
import { useActionSheet } from '@expo/react-native-action-sheet';
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { StatusBar } from 'expo-status-bar';

import HeaderButtom from '../../components/UI/HeaderButton';
import Loader from '../../components/UI/Loader';
import Colors from '../../constants/Colors';
import { listMatches } from '../../store/actions/swipe';

import SwipeError from '../../components/SwipeError';
import ActivityModal from '../../components/UI/ActivityModal';
import ChatAvatar from '../../components/ChatAvatar';

/* For test purposes */
import chats from '../../chats.json';

const ChatsScreen = (props) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const dispatch = useDispatch();
  const [localLoading, setLocalLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const listMatchesReducer = useSelector((state) => state.listMatches);
  const {
    loading: loadingMatches,
    error: errorMatches,
    data: matches,
  } = listMatchesReducer;

  useEffect(() => {
    dispatch(listMatches());
  }, []);
  const reload = useCallback(async () => {
    setLocalLoading(true);
    try {
      await dispatch(listMatches());
    } catch (err) {
      console.log(err);
    }
    // reset the top profile so dont show it over and over
    props.navigation.setParams({ topProfile: null });
    setLocalLoading(false);
  }, [dispatch]);
  const onOpenActionSheet = (matchedProfile, matchId) => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = ['Send message', 'Remove match', 'Cancel'];
    const destructiveButtonIndex = 2;
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          handleInstagram(matchedProfile.instagram);
        }
        if (buttonIndex === 1) {
          handleDeleteMatch(matchId);
        }
        return null;
      }
    );
  };

  if (loadingMatches) {
    return (
      <SafeAreaView style={styles.safe}>
        <StatusBar style="light" />
        <View style={styles.screen}>
          <ActivityModal
            loading
            title="Loading"
            size="small"
            activityColor="white"
            titleColor="white"
            activityWrapperStyle={{
              backgroundColor: 'transparent',
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
  const renderBubblesMatches = ({ item }) => {
    const matchedData = item.matched_data;
    const matchedProfile = item.matched_data.matched_profile;
    return (
      <View style={styles.new_matches}>
        <ChatAvatar
          onShowProfile={() =>
            handleShowProfile(matchedProfile, matchedData.is_group_match)
          }
          matchedProfile={matchedProfile}
          matchedData={matchedData}
          isInGroup={matchedData.is_group_match}
          matchedProfileHasPhoto={matchedProfile.photos.length > 0}
          matchedProfilePhoto={
            matchedProfile.photos.length > 0
              ? matchedProfile.photos[0].image
              : null
          }
        />
      </View>
    );
  };
  const renderPreviewChats = ({ item }) => {
    const matchedData = item.matched_data;
    const matchedProfile = item.matched_data.matched_profile;
    return (
      <View style={styles.container}>
        <View>
          <ChatAvatar
            onShowProfile={() =>
              handleShowProfile(matchedProfile, matchedData.is_group_match)
            }
            matchedProfile={matchedProfile}
            matchedData={matchedData}
            isInGroup={matchedData.is_group_match}
            matchedProfileHasPhoto={matchedProfile.photos.length > 0}
            matchedProfilePhoto={
              matchedProfile.photos.length > 0
                ? matchedProfile.photos[0].image
                : null
            }
          />
        </View>
        <TouchableOpacity
          onPress={() => onOpenActionSheet(matchedProfile, item.id)}
          style={styles.cardContainer}>
          <View style={styles.chat_preview}>
            <Text style={styles.matchedName}>{matchedProfile.name}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.screen}>
        <View>
          <Text style={styles.title}> New Matches</Text>
          {/* {localLoading && renderAllCardSwiped()} */}
          {!localLoading && matches?.results && (
            <ScrollView
              horizontal
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={reload}
                  tintColor={Colors.white}
                />
              }>
              <FlatList
                contentContainerStyle={styles.new_matches}
                data={matches?.results}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderBubblesMatches}
              />
            </ScrollView>
          )}
          {errorMatches && ( // if there is an error
            <SwipeError
              title="Error"
              message={errorMatches}
              onReload={reload}
            />
          )}
        </View>
        <View style={styles.chat_preview}>
          <Text style={styles.title}> Chats</Text>
          <ScrollView>
            <FlatList
              contentContainerStyle={styles.chats}
              data={chats.results}
              renderItem={renderPreviewChats}
            />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  screen: {
    flex: 2,
    backgroundColor: Colors.bg,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    bottom: 10,
  },

  text: {
    color: 'white',
  },

  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },

  new_matches: {
    overflow: 'hidden',
    marginTop: 5,
    marginLeft: 5,
    flexDirection: 'row',
    backgroundColor: Colors.bg,
  },

  chats: {
    overflow: 'hidden',
    marginTop: 10,
    marginLeft: 5,
    flexDirection: 'column',
    backgroundColor: Colors.bg,
  },

  match_image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.orange,
    margin: 10,
  },

  container: {
    flexDirection: 'row',
    flex: 2,
    marginBottom: 15,
  },

  matchedName: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: 'center',
  },

  chat_preview: {
    flex: 1,
    borderBottomColor: Colors.calypso,
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

ChatsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Chats',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          iconName={
            Platform.OS === 'android' ? 'ios-arrow-back' : 'ios-arrow-back'
          }
          onPress={() => {
            navData.navigation.navigate('Swipe');
          }}
          title="Back arrow"
        />
      </HeaderButtons>
    ),
  };
};
export default ChatsScreen;
