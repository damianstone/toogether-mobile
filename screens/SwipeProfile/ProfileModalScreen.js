import React from 'react';
import { StyleSheet, View, ImageBackground, Alert } from 'react-native';
import Swiper from 'react-native-swiper';
import { useDispatch, useSelector } from 'react-redux';
import { blockProfile } from '../../store/actions/block';
import { like } from '../../store/actions/swipe';
import { checkServerError, check400Error } from '../../utils/errors';
import { getImage } from '../../utils/getMethods';
import * as b from '../../constants/block';

import DetailBottomSheet from '../../components/DetailBottomSheet';
import Colors from '../../constants/Colors';

const ProfileScreen = (props) => {
  const dispatch = useDispatch();
  const profile = props.route.params.profile;
  const isGroup = props.route.params.isGroup;
  const preview = props.route.params.preview;
  const currentRef = props.route.params.currentRef;

  const blockProfileReducer = useSelector((state) => state.blockProfile);
  const {
    loading: blockLoading,
    error: blockError,
    data: blockData,
  } = blockProfileReducer;

  const handleClose = () => {
    props.navigation.goBack();
  };

  const handleLike = async (profileId) => {
    await dispatch(like(profileId));
    props.navigation.goBack();
    if (currentRef) {
      currentRef.swipeRight();
    }
  };

  const handleDislike = () => {
    props.navigation.goBack();
    if (currentRef) {
      currentRef.swipeRight();
    }
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
          }
        >
          {profile?.photos?.length > 0 ? (
            profile.photos.map((photo) => (
              <ImageBackground
                key={profile.id}
                style={styles.image}
                imageStyle={styles.imageStyle}
                source={{ uri: `${getImage(photo.image)}` }}
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
          handleClose={handleClose}
          handleLike={() => handleLike(profile.id)}
          handleDislike={() => handleDislike(profile.id)}
          openAlert={openAlert}
          isGroup={isGroup}
          preview={preview}
          name={profile.name}
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

export default ProfileScreen;

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
