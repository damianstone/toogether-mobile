import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ImageBackground, Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Swiper from 'react-native-swiper';
import Constants from 'expo-constants';
import { useDispatch, useSelector } from 'react-redux';
import { blockProfile } from '../../store/actions/block';
import { checkServerError, check400Error } from '../../utils/errors';
import * as b from '../../constants/block';

import DetailBottomSheet from '../../components/DetailBottomSheet';
import Colors from '../../constants/Colors';

const ProfileModalScreen = (props) => {
  const dispatch = useDispatch();
  const BASE_URL = Constants.manifest.extra.LOCAL_URL;
  const profile = props.navigation.getParam('profile');
  const isGroup = props.navigation.getParam('isGroup');
  const preview = props.navigation.getParam('preview');

  const blockProfileReducer = useSelector((state) => state.blockProfile);
  const {
    loading: blockLoading,
    error: blockError,
    data: blockData,
  } = blockProfileReducer;

  const handleLike = () => {
    // TODO: send like
    // TODO: close the modal
  };

  const handleBlockProfile = () => {
    if (profile.id) {
      dispatch(blockProfile(profile.id));
    }
  };

  const openAlert = () => {
    Alert.alert(
      'Do you want to block this profile?',
      'If you block this profile, none of you will be able to see their profiles',
      [
        {
          text: 'No',
          style: 'cancel',
        },
        {
          text: 'Block profile',
          onPress: () => {
            handleBlockProfile();
          },
          style: 'destructive',
        },
      ]
    );
  };

  if (blockError) {
    if (blockError?.response?.status === 400) {
      check400Error(blockError);
    } else {
      checkServerError(blockError);
    }
    checkServerError(blockError);
  }

  if (blockData) {
    Alert.alert(
      'Profile blocked',
      'None of you will be able to see their profiles',
      [
        {
          text: 'OK',
          onPress: () => props.navigation.navigate('Swipe'),
        },
      ]
    );
    dispatch({ type: b.BLOCK_PROFILE_RESET });
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bgCard }}>
      <>
        <Swiper
          style={styles.wrapper}
          removeClippedSubviews={false}
          showsButtons
          loop={false}
          paginationStyle={{ top: 5, bottom: null }}
          dot={
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,.2)',
                width: 8,
                height: 8,
                borderRadius: 4,
                margin: 4,
              }}
            />
          }
          activeDot={
            <View
              style={{
                backgroundColor: Colors.orange,
                width: 8,
                height: 8,
                borderRadius: 4,
                margin: 4,
              }}
            />
          }>
          {profile.photos.length > 0 ? (
            profile.photos.map((photo) => (
              <ImageBackground
                key={profile.id}
                style={styles.image}
                imageStyle={styles.imageStyle}
                source={{ uri: `${photo.image}` }}
                resizeMode="cover"
              />
            ))
          ) : (
            <ImageBackground
              key={profile.id}
              style={styles.image}
              imageStyle={styles.imageStyle}
              source={require('../../assets/images/placeholder-profile.png')}
              resizeMode="cover"
            />
          )}
        </Swiper>
        <DetailBottomSheet
          onClose={() => props.navigation.goBack()}
          handleLike={handleLike}
          openAlert={openAlert}
          isGroup={isGroup}
          preview={preview}
          firstname={profile.firstname}
          lastname={profile.lastname}
          age={profile.age}
          city={profile.city}
          live_in={profile.live_in}
          from={profile.nationality}
          university={profile.university}
          description={profile.description}
        />
      </>
    </View>
  );
};

export default ProfileModalScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  imageStyle: {
    height: '100%',
  },
});
