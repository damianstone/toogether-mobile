import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ImageBackground, Alert } from 'react-native';
import Swiper from 'react-native-swiper';
import Constants from 'expo-constants';
import { useDispatch, useSelector } from 'react-redux';
import { blockProfile } from '../../store/actions/block';
import { checkServerError, check400Error } from '../../utils/errors';

import ActivityModal from '../../components/UI/ActivityModal';
import Loader from '../../components/UI/Loader';
import DetailBottomSheet from '../../components/DetailBottomSheet';
import Colors from '../../constants/Colors';

// TODO: should I make a call to the profiler or receive the data as props

const ProfileModalScreen = (props) => {
  const dispatch = useDispatch();
  const BASE_URL = Constants.manifest.extra.LOCAL_URL;
  const profile = props.navigation.getParam('profile');
  const isGroup = props.navigation.getParam('isGroup');

  const blockProfileReducer = useSelector((state) => state.blockProfile);
  const {
    loading: blockLoading,
    error: blockError,
    data: blockData,
  } = blockProfileReducer;

  // TODO: add buttom sheet

  // TODO: like action

  // TODO: solve error with block profile

  useEffect(() => {
    if (blockError) {
      if (blockError?.response?.status === 400) {
        check400Error(blockError);
      } else {
        checkServerError(blockError);
      }
      checkServerError(blockError);
    }

    if (blockData) {
      props.navigation.goBack(0);
    }
    return null;
  }, [blockError]);

  const handleLike = () => {};

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

  return (
    <View style={{ flex: 1 }}>
      {blockLoading && <Loader />}
      {!blockLoading && (
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
            {profile.photos.map((photo) => {
              return (
                <ImageBackground
                  key={profile.id}
                  style={styles.image}
                  imageStyle={styles.imageStyle}
                  source={{ uri: `${BASE_URL}${photo.image}` }}
                  resizeMode="cover"
                />
              );
            })}
          </Swiper>
          <DetailBottomSheet
            onClose={() => props.navigation.goBack(null)}
            handleLike={handleLike}
            openAlert={openAlert}
            isGroup={isGroup}
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
      )}
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
