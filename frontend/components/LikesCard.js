import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import Colors from '../constants/Colors';
import Info from './Info';

const LikesCard = (props) => {
  // swipe pass as a props the profiles array of each group of the single profile
  const { group } = props;

  // send the id to the swipe component
  const showProfile = (id) => {
    props.onProfile(id);
    console.log("group id ---------->", id);
  };

  let cardType;
  // if the profiles array > 1
  if (group.totalMembers === 1) {
    cardType = {
      //position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: 30,
    };
  } else {
    cardType = {
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: 30,
      backgroundColor: Colors.orange,
    };
  }

  return (
    <View style={styles.screen}>
      <View style={{ ...cardType }}>
        <TouchableOpacity
          onPress={() => showProfile(group.id)}
          style={styles.touch}>
          {group.totalMembers > 1 && (
            <View style={styles.groupName}>
              <Text style={styles.text}>Grupo de {group.members[0].name}</Text>
            </View>
          )}
          <ImageBackground
            key={group.id}
            style={styles.image}
            imageStyle={styles.imageStyle}
            source={{uri: `http://127.0.0.1:8000${group.photo}`}}
            resizeMode="cover">
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LikesCard;

const styles = StyleSheet.create({
  screen: {
    flex: 0.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 200,
    margin: 15,
  },
  groupName: {
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  imageStyle: {
    borderRadius: 30,
    height: '100%',
  },
  text: {
    fontSize: 9,
    fontWeight: 'bold',
    color: Colors.white,
  },
  touch: {
    height: 200,
  },
});

/*





*/
