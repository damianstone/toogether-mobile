import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';

import LikesCard from '../components/LikesCard';
import Colors from '../constants/Colors';

const Likes = (props) => {
  const likes = useSelector((state) => state.swipeList.swipes);

  const showProfileHandler = (id) => {
    props.navigation.navigate('Swipe', { profileId: id });
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={likes}
        horizontal={false}
        keyExtractor={(group) => group._id}
        numColumns={2}
        renderItem={(group) => (
          <LikesCard
            firstName="name"
            group={group.item}
            key={group._id}
            onProfile={showProfileHandler}
          />
        )}
      />
    </View>
  );
};

export default Likes;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.bg,
    flex: 1,
  },
});
