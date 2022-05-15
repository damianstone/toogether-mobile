import React from 'react';
import { useSelector } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
} from 'react-native';

import Colors from '../constants/Colors';
import LikesCard from '../components/LikesCard';

const Likes = (props) => {
  const likes = useSelector((state) => state.swipeList.swipes);

  const showProfileHandler = (id) => {
    props.navigation.navigate('Swipe', { profileId: id });
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={likes}
        numColumns={2}
        horizontal={false}
        keyExtractor={(group) => group._id}
        renderItem={(group, index, separator) => (
          <LikesCard
            key={group._id}
            firstName={
              'name'
            }
            group={group.item}
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
