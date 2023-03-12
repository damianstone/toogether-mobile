import React, { useState, useEffect, useCallback } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Image,
  RefreshControl,
  Text,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { listLikes, removeLike, like } from '../../store/actions/swipe';
import { checkServerError } from '../../utils/errors';
import { exist, isMatch, alreadyMatched } from '../../utils/checks';

import * as w from '../../constants/swipe';
import HeaderButtom from '../../components/UI/HeaderButton';
import LikeCard from '../../components/LikeCard';
import Avatar from '../../components/UI/Avatar';
import Loader from '../../components/UI/Loader';
import Colors from '../../constants/Colors';

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
    dispatch(listLikes());
  }, []);

  useEffect(() => {
    if (removeLikeError) {
      checkServerError(removeLikeError);
      dispatch({ type: w.REMOVE_LIKE_RESET });
    }
    if (likeError) {
      checkServerError(likeError);
      dispatch({ type: w.LIKE_PROFILE_RESET });
    }
  }, [dispatch, removeLikeError, likeError]);

  useEffect(() => {
    if (removeLikeSuccess) {
      dispatch({ type: w.REMOVE_LIKE_RESET });
      dispatch(listLikes());
    }
  }, [dispatch, removeLikeSuccess]);

  useEffect(() => {
    if (isMatch(likeData)) {
      props.navigation.navigate('SwipeMatch', {
        likeData: likeData,
      });
    }

    if (alreadyMatched(likeData)) {
      props.navigation.navigate('Chat');
    }

    dispatch({ type: w.LIKE_PROFILE_RESET });
  }, [dispatch, likeData?.details]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('didFocus', () => {
      reload();
    });
    return () => unsubscribe;
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

  const handleRemoveLike = async (profileId) => {
    if (profileId) {
      await dispatch(removeLike(profileId));
    }
    return null;
  };

  const handleLike = async (profileId) => {
    if (profileId) {
      await dispatch(like(profileId));
    }
    return null;
  };

  const getRandomMember = (members) => {
    return members[Math.floor(Math.random() * members.length)];
  };

  const renderLikeCard = ({ item }) => {
    if (item.hasOwnProperty('members')) {
      const member = getRandomMember(item.members);
      return (
        <LikeCard
          key={member.id}
          isGroup
          name={member.name}
          age={member.age}
          image={member.photos.length > 0 ? member.photos[0].image : null}
          onShowProfile={() =>
            props.navigation.push('Swipe', { topProfile: item })
          }
          dislike={() => handleRemoveLike(member.id)}
          like={() => handleLike(member.id)}
        />
      );
    }

    return (
      <LikeCard
        key={item.id}
        name={item.name}
        age={item.age}
        image={item.photos.length > 0 ? item.photos[0].image : null}
        onShowProfile={() =>
          props.navigation.push('Swipe', { topProfile: item })
        }
        dislike={() => handleRemoveLike(item.id)}
        like={() => handleLike(item.id)}
      />
    );
  };

  const renderEmptyList = () => {
    return (
      <View
        style={{
          backgroundColor: Colors.bg,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          textAlign: 'center',
        }}
      >
        <View style={{ width: 200, height: 200 }}>
          <Image
            source={require('../../assets/images/no-likes.png')}
            style={{ resizeMode: 'contain', flex: 1, aspectRatio: 1 }}
          />
        </View>
        <Text style={{ color: Colors.white, fontSize: 15 }}>
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
          contentContainerStyle={{ flexGrow: 1 }}
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          title="Chat"
          iconName={
            Platform.OS === 'android'
              ? 'chatbubble-outline'
              : 'chatbubble-outline'
          }
          onPress={() => {
            navData.navigation.navigate('Match', {
              screen: 'Likes',
            });
          }}
        />
      </HeaderButtons>
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
