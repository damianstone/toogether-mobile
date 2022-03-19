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
import LikesCard from '../components/LikesCard/LikesCard';

const Likes = (props) => {
  const groups = useSelector((state) => state.groups.groups);

  const showProfileHandler = (id) => {
    props.navigation.navigate('Profile', { profileId: id });
  };

  return (
    <View style={styles.screen}>
      <FlatList
        data={groups}
        numColumns={2}
        horizontal={false}
        keyExtractor={(group) => group.id}
        renderItem={(group, index, separator) => (
          <LikesCard
            key={group.id}
            firstName={
              group.totalMembers > 1 ? elem.members[0].firstName : null
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
