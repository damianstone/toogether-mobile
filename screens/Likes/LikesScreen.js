import React, { useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  RefreshControl,
  Text,
  Button,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { listLikes, removeLike, like } from '../../store/actions/swipe';
import { checkServerError } from '../../utils/errors';

import * as w from '../../constants/swipe';
import LikeCard from '../../components/LikeCard';
import Avatar from '../../components/UI/Avatar';
import Loader from '../../components/UI/Loader';
import Colors from '../../constants/Colors';

// TODO: give life from the this screen
// TODO: render match
// TODO: display likes as a group

const LikesScreen = (props) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(
    !!(removeLikeLoading || likeLoading)
  );

  const likesReducer = useSelector((state) => state.listLikes);
  const {
    error: likesError,
    loading: likesLoading,
    data: likes,
  } = likesReducer;

  const removeLikeReducer = useSelector((state) => state.removeLike);
  const {
    error: removeLikeError,
    loading: removeLikeLoading,
    data: removeLikeSuccess,
  } = removeLikeReducer;

  const likeReducer = useSelector((state) => state.like);
  const {
    error: likeError,
    loading: likeLoading,
    data: likeData,
  } = likeReducer;

  useEffect(() => {
    if (likesError) {
      checkServerError(likesError);
    }
    if (removeLikeError) {
      checkServerError(removeLikeError);
    }
    if (likeError) {
      checkServerError(likeError);
    }
    dispatch(listLikes());
  }, [dispatch, likesError, removeLikeError, likeError]);

  useEffect(() => {
    if (removeLikeSuccess) {
      dispatch({ type: w.REMOVE_LIKE_RESET });
      dispatch(listLikes());
    }
    if (likeData) {
      dispatch({ type: w.LIKE_PROFILE_RESET });
      dispatch(listLikes());
    }
  }, [removeLikeSuccess, likeData]);

  // add listener to fetch the user and re fetch it
  useEffect(() => {
    const unsubscribe = props.navigation.addListener('didFocus', () => {
      reload();
    });
    return unsubscribe;
  }, [reload]);

  const reload = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(listLikes());
    } catch (err) {
      console.log(err);
    }
    setRefreshing(false);
  }, [dispatch]);

  const showProfileHandler = (profile) => {
    props.navigation.navigate('SwipeProfile', {
      profile: profile,
      isGroup: false,
    });
  };

  const handleRemoveLike = async (profileId) => {
    if (profileId) {
      await dispatch(removeLike(profileId));
    }
    if (removeLikeSuccess) {
      return dispatch(listLikes());
    }
    return null;
  };

  const handleLike = async (profileId) => {
    if (profileId) {
      await dispatch(like(profileId));
    }
    if (likeData) {
      return dispatch(listLikes());
    }
    return null;
  };

  const renderLikeCard = ({ item, index }) => {
    return (
      <LikeCard
        key={item.id}
        firstname={item.firstname}
        lastname={item.lastname}
        age={item.age}
        image={item.photos.length > 0 ? item.photos[0].image : null}
        onShowProfile={() => showProfileHandler(item)}
        dislike={() => handleRemoveLike(item.id)}
        like={() => handleLike(item.id)}
      />
    );
  };

  const renderEmptyList = () => {
    return (
      <View style={styles.emptyScreen}>
        <Text
          style={{
            color: Colors.white,
            fontSize: 20,
            fontWeight: '500',
            alignSelf: 'center',
          }}>
          No likes yet :(
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.screen}>
      {removeLikeLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={likes ? likes.results : []}
          horizontal={false}
          keyExtractor={(profile) => profile.id}
          numColumns={2}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={reload}
              tintColor={Colors.white}
            />
          }
          renderItem={renderLikeCard}
          ListEmptyComponent={renderEmptyList}
        />
      )}
    </View>
  );
};

LikesScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Likes',
    headerLeft: () => (
      <Avatar
        onPress={() => {
          navData.navigation.navigate('MyProfile');
        }}
      />
    ),
  };
};

export default LikesScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.bg,
    flex: 1,
  },
  emptyScreen: {
    backgroundColor: Colors.bg,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});