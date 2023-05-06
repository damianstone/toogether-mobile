import React from 'react';
import { StyleSheet, View, ImageBackground, Alert } from 'react-native';
import Swiper from 'react-native-swiper';
import { useDispatch, useSelector } from 'react-redux';
import { blockProfile } from '../../store/actions/block';
import { like, listSwipe } from '../../store/actions/swipe';
import { checkServerError, check400Error } from '../../utils/errors';
import { getImage } from '../../utils/getMethods';
import * as b from '../../constants/requestTypes/block';
import * as r from '../../constants/requestTypes/user';
import ActivityModal from '../../components/UI/ActivityModal';

import DetailBottomSheet from '../../components/DetailBottomSheet';
import Colors from '../../constants/Colors';
import { reportProfile } from '../../store/actions/user';
import FastImage from 'react-native-fast-image';

const ProfileScreen = (props) => {
  const { profile, isGroup, preview, isMyProfile, currentRef } =
    props.route.params;

  const dispatch = useDispatch();

  const blockProfileReducer = useSelector((state) => state.blockProfile);
  const {
    loading: blockLoading,
    error: blockError,
    data: blockData,
  } = blockProfileReducer;

  const reportProfileReducer = useSelector((state) => state.reportProfile);
  const {
    loading: reportLoading,
    error: reportError,
    data: reportData,
  } = reportProfileReducer;

  // reload function then redirect to swipe screen
  const reloadAndRedirectToSwipe = async () => {
    try {
      await dispatch(listSwipe());
    } catch (err) {
      console.log(err);
    }
    props.navigation.navigate('Swipe');
  };

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

  const handleReportProfile = () => {
    if (profile.id) {
      dispatch(reportProfile(profile.id));
    }
  };

  const blockProfileAlert = () => {
    Alert.alert(
      'Do you want to block this profile?',
      'If you block this profile, none of you will be able to see their profiles',
      [
        {
          text: 'Cancel',
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

  const reportProfileAlert = () => {
    Alert.alert(
      'Are you sure you want to report this profile?',
      `We will review this profile, and won't tell ${profile.name}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Submit',
          onPress: () => {
            handleReportProfile();
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
  }

  if (blockData) {
    Alert.alert(
      'Profile blocked',
      'None of you will be able to see their profiles',
      [
        {
          text: 'OK',
          onPress: () => reloadAndRedirectToSwipe(),
        },
      ]
    );
    dispatch({ type: b.BLOCK_PROFILE_RESET });
  }

  if (reportError) {
    if (reportError?.response?.status === 400) {
      check400Error(reportError);
    } else {
      checkServerError(reportError);
    }
  }

  if (reportData) {
    Alert.alert(
      'Profile reported',
      'The profile will be reviewed and handeled by our dev team shortly.',
      [
        {
          text: 'OK',
          onPress: () => reloadAndRedirectToSwipe(),
        },
      ]
    );
    dispatch({ type: r.REPORT_PROFILE_RESET });
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bgCard }}>
      <>
        <ActivityModal
          loading={reportLoading || blockLoading}
          title="Loading"
          size="small"
          activityColor="white"
          titleColor="white"
          activityWrapperStyle={{
            backgroundColor: 'transparent',
          }}
        />
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
              <FastImage
                key={profile.id}
                style={styles.image}
                imageStyle={styles.imageStyle}
                source={{
                  uri: `${getImage(photo.image)}`,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
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
          blockProfileAlert={blockProfileAlert}
          reportProfileAlert={reportProfileAlert}
          isMyProfile={isMyProfile}
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
