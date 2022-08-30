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
  Alert,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

// import ActivityModal from '../../components/UI/ActivityModal';
import HeaderButtom from '../../components/UI/HeaderButton';
import Colors from '../../constants/Colors';
import * as c from '../../constants/user';
import {
  listUserPhotos,
  getUserProfile,
  removeUserPhoto,
  addPhoto,
} from '../../store/actions/user';
import { checkServerError } from '../../utils/errors';
import { verifyPermissions } from '../../utils/permissions';
import styles from './styles';

const BASE_PHOTOS = [
  {
    id: 1,
    text: 'Add photo',
  },
  {
    id: 2,
    text: 'Add photo',
  },
  {
    id: 3,
    text: 'Add photo',
  },
  {
    id: 4,
    text: 'Add photo',
  },
  {
    id: 5,
    text: 'Add photo',
  },
  {
    id: 6,
    text: 'Add photo',
  },
];

const MyProfileScreen = (props) => {
  const BASE_URL = Constants.manifest.extra.LOCAL_URL;
  const dispatch = useDispatch();
  const { showActionSheetWithOptions } = useActionSheet();
  const [image, setImage] = useState();

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

  let PHOTOS = {};
  if (photos) {
    PHOTOS = Object.keys(photos).map((key) => {
      return photos[key];
    });
  }

  const userRemovePhoto = useSelector((state) => state.userRemovePhoto);
  const {
    loading: loadingRemovePhoto,
    error: errorRemovePhoto,
    data: dataRemovePhoto,
  } = userRemovePhoto;

  const userAddPhoto = useSelector((state) => state.userAddPhoto);
  const {
    loading: loadingAddPhoto,
    error: errorAddPhoto,
    data: dataAddPhoto,
  } = userAddPhoto;

  useEffect(() => {
    if (!userProfile) {
      dispatch(getUserProfile());
    }
    if (errorProfile) {
      console.log({ ...errorProfile });
    }
  }, [photos, userProfile]);

  useEffect(() => {
    if (!photos || dataRemovePhoto || dataAddPhoto) {
      dispatch(listUserPhotos());
    }

    if (errorRemovePhoto || errorPhotos) {
      checkServerError(errorRemovePhoto);
    }
    if (dataRemovePhoto) {
      Alert.alert('Photo Removed', dataRemovePhoto.detail, {
        text: 'Ok',
        onPress: () => {
          dispatch({ type: c.USER_REMOVE_PHOTO_RESET });
        },
      });
    }
    dispatch({ type: c.USER_REMOVE_PHOTO_RESET });
  }, []);

  // TODO: Add new photo action
  const handleAddPhoto = async () => {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });
    if (image) {
      dispatch(addPhoto(image));
    }
  };

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

  const onOpenActionSheet = (photo_id) => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = [
      'Make Profile Picture', // 0
      'Add New Photo', // 1...
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
        if (buttonIndex === 2) dispatch(removeUserPhoto(photo_id));
        return null;
      }
    );
  };

  const renderPhoto = (photo) => {
    return (
      <TouchableOpacity
        key={photo.id}
        onPress={() => onOpenActionSheet(photo.id)}
        style={styles.myphotosItemView}>
        {loadingRemovePhoto ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size="large" color={Colors.icons} />
          </View>
        ) : (
          <Image
            source={{
              uri: `${BASE_URL}${photo.image}`,
            }}
            style={{ width: '100%', height: '100%' }}
          />
        )}
      </TouchableOpacity>
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
          <ScrollView
            style={styles.body}
            contentContainerStyle={styles.scroll_container_style}>
            {loadingProfile ? (
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator size="large" color={Colors.icons} />
              </View>
            ) : (
              <>
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
                <View style={styles.myphotosView}>
                  <View style={styles.itemView}>
                    <Text style={styles.photoTitleLabel}>My Photos</Text>
                  </View>
                  {userProfile && (
                    <FlatList
                      style={styles.flatlist_photos_style}
                      contentContainerStyle={
                        styles.flatlist_photos_container_style
                      }
                      data={BASE_PHOTOS}
                      horizontal={false}
                      keyExtractor={(photo) => photo.id}
                      ListEmptyComponent={renderNoPhotos}
                      nestedScrollEnabled
                      numColumns={3}
                      renderItem={({ item, index }) =>
                        PHOTOS[index] ? (
                          renderPhoto(PHOTOS[index])
                        ) : (
                          <TouchableOpacity
                            key={item.id}
                            onPress={handleAddPhoto}
                            style={{
                              ...styles.myphotosItemView,
                              backgroundColor: Colors.bgCard,
                            }}>
                            <View
                              style={{
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text style={{ color: Colors.white }}>
                                {item.text}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        )
                      }
                      scrollEnabled={false}
                    />
                  )}
                </View>
              </>
            )}

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
