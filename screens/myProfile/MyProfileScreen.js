/* eslint-disable react/jsx-curly-brace-presence */
import React, { useEffect, useState, useCallback } from 'react';
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
  RefreshControl,
  Linking,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { useActionSheet } from '@expo/react-native-action-sheet';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useNetInfo } from '@react-native-community/netinfo';

import HeaderButtom from '../../components/UI/HeaderButton';
import Loader from '../../components/UI/Loader';
import Colors from '../../constants/Colors';
import * as c from '../../constants/user';
import {
  listUserPhotos,
  getUserProfile,
  removeUserPhoto,
  addPhoto,
  updatePhoto,
} from '../../store/actions/user';
import { checkServerError, check400Error } from '../../utils/errors';
import { verifyPermissions } from '../../utils/permissions';
import styles from './styles';

// TODO: remove toogether premium section

const BASE_PHOTOS = [
  {
    id: 1,
    text: 'Add 📸',
  },
  {
    id: 2,
    text: 'Add 📸',
  },
  {
    id: 3,
    text: 'Add 📸',
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
  const BASE_URL = Constants.manifest.extra.BUCKET_URL;
  const dispatch = useDispatch();
  const netInfo = useNetInfo();
  const { showActionSheetWithOptions } = useActionSheet();
  const [refreshing, setRefreshing] = useState(false);
  const [photoId, setPhotoId] = useState('');
  const [photos, setPhotos] = useState();

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
    data: dataPhotos,
  } = userListPhotos;

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
    if (!userProfile && !errorProfile) {
      dispatch(getUserProfile());
    }
    if (errorProfile) {
      checkServerError(errorProfile);
    }
  }, [photos, userProfile]);

  useEffect(() => {
    if (dataPhotos) {
      setPhotos([...dataPhotos]);
    }

    if ((!photos || dataRemovePhoto || dataAddPhoto) && !errorPhotos) {
      dispatch(listUserPhotos());
    }

    if (errorRemovePhoto || errorPhotos || errorAddPhoto) {
      console.log(errorAddPhoto);
      if (errorAddPhoto?.response?.status === 400) {
        check400Error(errorAddPhoto, 'image');
      } else {
        checkServerError(errorAddPhoto);
      }
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

    if (dataAddPhoto) {
      Alert.alert('Photo added', 'well done', {
        text: 'Ok',
        onPress: () => {
          dispatch({ type: c.USER_ADD_PHOTO_RESET });
        },
      });
    }

    dispatch({ type: c.USER_ADD_PHOTO_RESET });
    dispatch({ type: c.USER_REMOVE_PHOTO_RESET });
  }, [
    dataPhotos,
    dataRemovePhoto,
    dataAddPhoto,
    errorRemovePhoto,
    errorPhotos,
    errorAddPhoto,
  ]);

  const loadProfile = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(getUserProfile());
      await dispatch(listUserPhotos());
    } catch (err) {
      checkServerError(err);
    }
    setRefreshing(false);
  }, [dispatch]);

  const handleAddPhoto = async (photo_id, isUpdate) => {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });
    if (image && !isUpdate) {
      dispatch(addPhoto(image));
    }
    if (image && isUpdate) {
      dispatch(updatePhoto(photo_id, image));
    }
  };

  const onOpenActionSheet = (photo_id) => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = ['Update photo', 'Remove Photo', 'Cancel'];
    const destructiveButtonIndex = 2;
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          handleAddPhoto(photo_id, true);
          setPhotoId(photo_id); // to know in which base photo render the loader
        }
        if (buttonIndex === 1) {
          dispatch(removeUserPhoto(photo_id));
          setPhotoId(photo_id);
        }
        return null;
      }
    );
  };

  const handleOpenPreview = () => {
    props.navigation.navigate('Preview');
  };

  const handleOpenLink = useCallback(async (url) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);

  const getInitials = (firstname, lastname) => {
    const first = firstname ? firstname.charAt(0).toUpperCase() : 'N';
    const second = lastname ? lastname.charAt(0).toUpperCase() : 'N';
    return first + second;
  };

  const handleNavigate = (screen) => {
    props.navigation.navigate(screen);
  };

  const renderHeaderComponent = () => {
    return (
      <View style={styles.MainContainer}>
        <TouchableOpacity
          style={styles.profilePictureContainer}
          onPress={handleOpenPreview}>
          {photos && Object.values(photos).length > 0 && (
            <Image
              source={{
                uri: `${Object.values(photos)[0].image}`,
              }}
              style={styles.image}
            />
          )}
          {!photos ||
            (Object.values(photos).length === 0 && (
              <View style={styles.avatar_view}>
                <Text style={styles.avatar_initials}>
                  {getInitials(userProfile.firstname, userProfile.lastname)}
                </Text>
              </View>
            ))}
          {!netInfo.isConnected ||
            (!userProfile && (
              <View
                style={{
                  backgroundColor: Colors.placeholder,
                  width: 150,
                  height: 150,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Loader />
              </View>
            ))}
        </TouchableOpacity>
        <View style={styles.nameView}>
          {userProfile && (
            <>
              <Text style={styles.name}>
                {`${userProfile.firstname} ${userProfile.lastname}`}
              </Text>
              <TouchableOpacity onPress={() => handleNavigate('EditProfile')}>
                <MaterialIcons name="edit" size={20} color="white" />
              </TouchableOpacity>
            </>
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
          <FlatList
            style={styles.flatlist_photos_style}
            contentContainerStyle={styles.flatlist_photos_container_style}
            data={BASE_PHOTOS}
            horizontal={false}
            keyExtractor={(photo) => photo.id}
            nestedScrollEnabled
            numColumns={3}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={loadProfile}
                tintColor={Colors.white}
              />
            }
            renderItem={({ item, index }) =>
              photos && photos[index] ? (
                renderPhoto(photos[index], item.id)
              ) : (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    handleAddPhoto();
                    setPhotoId(item.id);
                  }}
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
                    {loadingAddPhoto && item.id === photoId ? (
                      <Loader size="small" />
                    ) : (
                      <Text style={{ color: Colors.white }}>Add photo</Text>
                    )}
                  </View>
                </TouchableOpacity>
              )
            }
            scrollEnabled={false}
          />
        </View>
      </View>
    );
  };

  const renderPhoto = (photo) => {
    let stylesObj = {
      ...styles.myphotosItemView,
      backgroundColor: 'transparent',
    };
    if (loadingRemovePhoto || loadingAddPhoto || loadingPhotos) {
      stylesObj = {
        ...styles.myphotosItemView,
        backgroundColor: 'transparent',
      };
    }
    return (
      <TouchableOpacity
        key={photo.id}
        onPress={() => onOpenActionSheet(photo.id)}
        style={{ ...stylesObj }}>
        {loadingPhotos ||
        loadingRemovePhoto ||
        (loadingAddPhoto && photo.id === photoId) ? (
          <Loader size="small" />
        ) : (
          <Image
            source={{
              uri: `${photo.image}`,
            }}
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'transparent',
            }}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.MainContainer}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.myphotosView}>
          <View style={styles.itemView}>
            <Text style={styles.photoTitleLabel}>My Photos</Text>
          </View>
          <FlatList
            style={styles.flatlist_photos_style}
            contentContainerStyle={styles.flatlist_photos_container_style}
            data={BASE_PHOTOS}
            horizontal={false}
            keyExtractor={(photo) => photo.id}
            nestedScrollEnabled
            numColumns={3}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={loadProfile}
                tintColor={Colors.white}
              />
            }
            ListHeaderComponent={renderHeaderComponent}
            renderItem={({ item, index }) =>
              photos && photos[index] ? (
                renderPhoto(photos[index], item.id)
              ) : (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => {
                    handleAddPhoto();
                    setPhotoId(item.id);
                  }}
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
                    {loadingAddPhoto && item.id === photoId ? (
                      <Loader size="small" />
                    ) : (
                      <Text style={{ color: Colors.white }}>Add photo</Text>
                    )}
                  </View>
                </TouchableOpacity>
              )
            }
            scrollEnabled={false}
          />
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
          iconName={
            Platform.OS === 'android' ? 'settings-sharp' : 'settings-sharp'
          }
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
          iconName={
            Platform.OS === 'android' ? 'ios-arrow-back' : 'ios-arrow-back'
          }
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
