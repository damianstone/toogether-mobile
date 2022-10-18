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
  const [showMatch, setShowMatch] = useState(true);
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

  const showProfileHandler = (id) => {
    props.navigation.navigate('Swipe', { profileId: id });
  };

  const handleRemoveLike = async (profileId) => {
    if (profileId) {
      await dispatch(removeLike(profileId));
    }
    if (removeLike) {
      return dispatch(listLikes());
    }
    return null;
  };

  const handleLike = useCallback(
    async (profileId) => {
      if (profileId) {
        await dispatch(like(profileId));
      }
      if (likeData) {
        setShowMatch(true);
      }
      return null;
    },
    [dispatch, likeData?.details]
  );

  const renderLikeCard = ({ item, index }) => {
    return (
      <LikeCard
        key={item.id}
        firstname={item.firstname}
        lastname={item.lastname}
        age={item.age}
        image={item.photos.length > 0 ? item.photos[0].image : null}
        onShowProfile={showProfileHandler}
        dislike={() => handleRemoveLike(item.id)}
        like={() => handleLike(item.id)}
      />
    );
  };

  if (showMatch) {
    return (
      <View>
        <Text>Match</Text>
        <Button title="off" onPress={() => setShowMatch(false)} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {removeLikeLoading ? (
        <Loader />
      ) : (
        <FlatList
          data={likes?.results}
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
});
