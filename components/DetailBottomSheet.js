import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';
import SwipeButtons from './SwipeButtons';

const DetailBottomSheet = (props) => {
  const {
    name,
    age,
    city,
    live_in,
    from,
    preview,
    isMyProfile,
    university,
    occupation,
    description,
    handleClose,
    handleDislike,
    handleLike,
    blockProfileAlert,
    reportProfileAlert,
  } = props;

  const details = [
    {
      detail: university,
      icon: '🎓',
      iconName: 'location',
    },
    {
      detail: occupation,
      icon: '😎',
      iconName: 'location',
    },
    {
      detail: live_in,
      icon: '📍',
      iconName: 'location',
    },
    {
      detail: city,
      icon: '📍',
      iconName: 'location',
    },
    {
      detail: from,
      icon: '🏡',
      iconName: 'location',
    },
  ];

  const filtered = details.filter(
    (obj) => obj.detail && obj.detail !== undefined
  );

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.scrollview}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.container1}>
        <View style={styles.nameTextContainer}>
          <Text style={styles.nameText}>{`${name}, ${age}`}</Text>
          {props.isGroup && (
            <Text style={styles.toogetherGroupText}>Toogether group</Text>
          )}
        </View>
        <TouchableOpacity onPress={handleClose} style={styles.closeContainer}>
          <Image
            source={require('../assets/images/red-arrow-down.png')}
            style={{ width: '100%', height: '100%' }}
          />
        </TouchableOpacity>
      </View>

      {filtered &&
        filtered.map((obj) => (
          <View style={styles.infoWrapper} key={obj.detail}>
            <Text style={{ fontSize: 17 }}>{obj.icon}</Text>
            <Text style={styles.text}>{obj.detail}</Text>
          </View>
        ))}

      <View style={styles.line} />

      <View style={styles.descriptionContainer}>
        <Text style={{ fontSize: 18, fontWeight: '500', marginBottom: 4 }}>
          About
        </Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>

      {/* preview means open as match or member of group, so no need of like buttons */}
      {!preview && (
        <>
          <View style={styles.line} />
          <SwipeButtons
            rewind={false}
            onLeft={handleDislike}
            onRight={handleLike}
          />
        </>
      )}

      {/* if  is my profile review, then don't give the option to block my profile */}
      {!isMyProfile && (
        <>
          <View style={styles.line} />
          <View style={styles.reportContainer}>
            <TouchableOpacity
              style={styles.blockButton}
              onPress={blockProfileAlert}
            >
              <Text style={styles.blockButtonText}>Block Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.blockButton}
              onPress={reportProfileAlert}
            >
              <Text style={styles.blockButtonText}>Report Profile</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default DetailBottomSheet;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 10,
    minHeight: '30%',
    maxHeight: '40%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  scrollview: {},
  container1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  nameTextContainer: {
    flexDirection: 'column',
  },
  closeContainer: {
    borderRadius: 100,
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 25,
    fontWeight: '500',
  },
  toogetherGroupText: {
    fontSize: 15,
    color: Colors.orange,
  },
  infoWrapper: {
    flexDirection: 'row',
    margin: 3,
  },
  icon: {
    fontSize: 20,
  },
  text: {
    fontSize: 15,
    marginLeft: 10,
  },
  descriptionContainer: {
    margin: 3,
  },
  descriptionText: {
    fontSize: 15,
  },
  line: {
    borderBottomColor: Colors.placeholder,
    borderBottomWidth: 0.8,
    margin: 10,
  },
  reportContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginBottom: 50,
  },
  blockButton: {
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  blockButtonText: {
    color: Colors.red,
    fontSize: 15,
  },
  redText: {
    color: Colors.red,
  },
});
