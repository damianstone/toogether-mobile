/* eslint-disable no-unused-vars */
import React from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';

import FastImageBackground from './UI/FastImageBackground';
import { getImage } from '../utils/getMethods';
import Colors from '../constants/Colors';
import InfoCard from './InfoCard';

const SwipeCard = ({
  isGroup,
  profile,
  members,
  showProfileHandler, // function to open the profile
  showProfileRestricted, // restriction to open a specific profile
  allowedProfileId,
}) => {
  const checkPhoto = (profile) => {
    if (profile.photos.length > 0) {
      return {
        uri: `${getImage(profile.photos[0]?.image)}`,
        priority: FastImage.priority.high,
      };
    }
    return require('../assets/images/placeholder-profile.png');
  };

  const renderSingleCard = () => {
    return (
      <FastImageBackground
        key={profile.id}
        containerStyle={styles.imageBackgroundContainer}
        imageStyle={styles.singleImageStyle}
        resizeMode={FastImage.resizeMode.cover}
        source={checkPhoto(profile)}
      >
        <InfoCard
          name={profile.name}
          city={profile.city}
          live_in={profile.live_in}
          from={profile.nationality}
          age={profile.age}
          university={profile.university}
        />
        <TouchableOpacity
          onPress={() => showProfileHandler(profile, false)}
          style={styles.arrowContainer}
        >
          <Image
            source={require('../assets/images/white-arrow-up.png')}
            style={{ width: '100%', height: '100%' }}
          />
        </TouchableOpacity>
      </FastImageBackground>
    );
  };

  const renderGroupCard = () => {
    return members.map((member) => (
      <FastImageBackground
        key={member.id}
        containerStyle={styles.imageBackgroundContainer}
        imageStyle={styles.groupImageStyle}
        resizeMode={FastImage.resizeMode.cover}
        source={checkPhoto(member)}
      >
        <InfoCard
          name={member.name}
          city={member.city}
          live_in={member.live_in}
          from={member.nationality}
          age={member.age}
          university={member.university}
        />
        {!showProfileRestricted && (
          <TouchableOpacity
            onPress={() => showProfileHandler(member, true)}
            style={styles.arrowContainer}
          >
            <Image
              source={require('../assets/images/white-arrow-up.png')}
              style={{ width: '100%', height: '100%' }}
            />
          </TouchableOpacity>
        )}
        {showProfileRestricted && allowedProfileId === member.id && (
          <TouchableOpacity
            onPress={() => showProfileHandler(member, true)}
            style={styles.arrowContainer}
          >
            <Image
              source={require('../assets/images/white-arrow-up.png')}
              style={{ width: '100%', height: '100%' }}
            />
          </TouchableOpacity>
        )}
      </FastImageBackground>
    ));
  };

  return (
    <View style={styles.screen}>
      <View style={isGroup ? styles.groupCard : styles.singleCard}>
        {isGroup && (
          <View style={styles.groupName}>
            <Text style={styles.text}>Toogether group</Text>
          </View>
        )}
        <Swiper
          activeDot={<View style={styles.activeDot} />}
          dot={<View style={styles.dot} />}
          loop={false}
          paginationStyle={{ top: 5, bottom: null }}
          removeClippedSubviews={false}
          showsButtons
          style={styles.wrapper}
        >
          {isGroup ? renderGroupCard() : renderSingleCard()}
        </Swiper>
      </View>
    </View>
  );
};

export default SwipeCard;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  activeDot: {
    backgroundColor: Colors.orange,
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 4,
  },
  dot: {
    backgroundColor: 'rgba(0,0,0,.2)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 4,
  },
  groupName: {
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 2,
    backgroundColor: Colors.orange,
  },
  imageBackgroundContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  text: {
    fontSize: 13,
    fontWeight: 'bold',
    color: Colors.white,
  },

  singleCard: {
    position: 'absolute',
    width: '107%',
    height: '80%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.placeholder,
  },

  groupCard: {
    position: 'absolute',
    width: '107%',
    height: '80%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.orange,
  },

  singleImageStyle: {
    borderRadius: 20,
    height: '100%',
  },
  groupImageStyle: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    height: '100%',
  },

  arrowContainer: {
    width: 50,
    height: 50,
    borderRadius: 100,

    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginVertical: 15,
    marginHorizontal: 15,
    padding: 10,
  },
});
