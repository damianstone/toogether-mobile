import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';

// import ActivityModal from '../../components/UI/ActivityModal';
import HeaderButtom from '../../components/UI/HeaderButton';
// import Colors from '../../constants/Colors';
import { listUserPhotos, getUserProfile } from '../../store/actions/user';
import styles from './styles';

const MyProfileScreen = (props) => {
  const BASE_URL = Constants.manifest.extra.LOCAL_URL;
  const dispatch = useDispatch();
  const { showActionSheetWithOptions } = useActionSheet();

  const userGetProfile = useSelector((state) => state.userGetProfile);
  const {
    loading: loadingProfile,
    error: errorProfile,
    data: userProfile,
  } = userGetProfile;

  const userListPhotos = useSelector((state) => state.userListPhotos);
  const {
    loading: loadingPhotos,
    error: errorPhotos,
    data: photos,
  } = userListPhotos;

  useEffect(() => {
    if (!photos) {
      dispatch(listUserPhotos());
    }
    if (!userProfile) {
      dispatch(getUserProfile());
    }
    if (errorProfile) {
      console.log({ ...errorProfile });
    }
  }, [photos, userProfile]);

  console.log({ ...userProfile });
  const onOpenUploadPhotoActionSheet = () => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = ['From Camera', 'Upload from Gallery', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 2) console.log('cancel');
      }
    );
  };

  const onOpenActionSheet = () => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = [
      'Make Profile Picture',
      'Add New Photo',
      'Remove Photo',
      'Cancel',
    ];
    const destructiveButtonIndex = 2;
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) onOpenUploadPhotoActionSheet();
      }
    );
  };

  const renderNoPhotos = () => {
    return (
      <View>
        <Text>NO PHOTOS YET COMPONENT</Text>
      </View>
    );
  };

  return (
    <View style={styles.MainContainer}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.MainContainer}>
          <ScrollView style={styles.body}>
            {/* MAIN FOTOS AND COUNTERS */}
            <View style={styles.profilePictureContainer}>
              {loadingPhotos && <ActivityIndicator />}
              {photos && (
                <Image
                  source={{
                    uri: `${BASE_URL}${Object.values(photos)[0].image}`,
                  }}
                  style={{ width: 150, height: 150, borderRadius: 100 }}
                />
              )}
              {!photos ||
                (Object.values(photos).length === 0 && (
                  <View style={styles.avatar_view}>
                    <Text style={styles.avatar_initials}>DS</Text>
                  </View>
                ))}
            </View>
            <View style={styles.nameView}>
              {userProfile && (
                <Text style={styles.name}>
                  {`${userProfile.firstname} ${userProfile.lastname}`}
                </Text>
              )}
            </View>
            <View style={styles.counterContainer}>
              <View style={styles.counterView}>
                <Text style={styles.likesNumber}>100</Text>
                <Text style={styles.counterText}>Likes</Text>
              </View>
              <View style={styles.counterView}>
                <Text style={styles.matchesNumber}>320</Text>
                <Text style={styles.counterText}>matches</Text>
              </View>
            </View>

            {/* PHOTOS */}

            <View style={styles.myphotosView}>
              <View style={styles.itemView}>
                <Text style={styles.photoTitleLabel}>My Photos</Text>
              </View>

              {userProfile && (
                <FlatList
                  style={styles.flatlist_photos_style}
                  contentContainerStyle={styles.flatlist_photos_container_style}
                  data={[...userProfile.photos]}
                  horizontal={false}
                  keyExtractor={(photo) => photo.id}
                  ListEmptyComponent={renderNoPhotos}
                  nestedScrollEnabled
                  numColumns={3}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      key={item.id}
                      onPress={onOpenActionSheet}
                      style={styles.myphotosItemView}>
                      <Image
                        source={{ uri: `${BASE_URL}${item.image}` }}
                        style={{ width: '100%', height: '100%' }}
                      />
                    </TouchableOpacity>
                  )}
                  scrollEnabled={false}
                />
              )}
            </View>

            {/* TOOGETHER PRO */}
            <View style={styles.circle}>
              <LinearGradient
                colors={['#ED665A', '#CF2A6E', '#BA007C']}
                style={styles.linearCircle}
              />
              <View style={{ alignItems: 'center' }}>
                <View style={styles.logoContainer}>
                  <Image
                    source={require('../../assets/images/logo-2.png')}
                    style={styles.logo}
                  />
                </View>
                <Text style={styles.proText}>
                  Enjoy unlimited likes and say goodbye to ads
                </Text>
                <View style={styles.buttonPremiumContainer}>
                  <TouchableOpacity
                    onPress={() => {}}
                    style={styles.buttonPremiumView}>
                    <LinearGradient
                      // Background Linear Gradient
                      colors={['#ED665A', '#CF2A6E', '#BA007C']}
                      style={styles.linearGradientButton}
                    />
                    <Text style={styles.buttonText}>Buy Toogether Premium</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

MyProfileScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'My Profile',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-arrow-back'}
          onPress={() => {
            // go to chat screen
            navData.navigation.navigate('Setting');
          }}
          title="Back arrow"
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-arrow-back'}
          onPress={() => {
            // go to chat screen
            navData.navigation.navigate('Swipe');
          }}
          title="Back arrow"
        />
      </HeaderButtons>
    ),
  };
};

export default MyProfileScreen;

/*
          PICKERS AND MODALS NATIVE 
          <ActivityModal
            loading={loading}
            title="please wait"
            size={'large'}
            activityColor={'white'}
            titleColor={'white'}
            activityWrapperStyle={{
              backgroundColor: Colors.bg,
            }}
          />
          <ActionSheet
            ref={photoDialogActionSheetRef}
            title={'Photo Dialog'}
            options={['Remove Photo', 'Cancel', 'Make Profile Picture']}
            cancelButtonIndex={1}
            destructiveButtonIndex={0}
            onPress={() => {}}
          />
          <ActionSheet
            ref={photoUploadDialogActionSheetRef}
            title={'Photo Upload'}
            options={['Launch Camera', 'Open Photo Gallery', 'Cancel']}
            cancelButtonIndex={2}
            onPress={() => {}}
          />
*/
