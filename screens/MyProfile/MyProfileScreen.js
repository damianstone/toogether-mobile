import React, { useEffect, useState, useCallback, useContext } from 'react';
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
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import FastImage from 'react-native-fast-image';
import { Context } from '../../context/ContextProvider';
import { getNameInitials, getImage } from '../../utils/getMethods';
import { checkServerError, check400Error } from '../../utils/errors';
import { verifyPermissions } from '../../utils/permissions';
import {
  listUserPhotos,
  getUserProfile,
  removeUserPhoto,
  addPhoto,
  updatePhoto,
} from '../../store/actions/user';

import NameCounter from '../../components/MyProfile/NameCounter';
import ProfileGallery from '../../components/MyProfile/ProfileGallery';
import FooterProfile from '../../components/MyProfile/FooterProfile';
import HeaderButtom from '../../components/UI/HeaderButton';
import Loader from '../../components/UI/Loader';
import * as c from '../../constants/user';
import styles from './styles';

const MyProfileScreen = (props) => {
  const { profileContext, updateProfileContext } = useContext(Context);

  const dispatch = useDispatch();
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
    if (userProfile) {
      updateProfileContext(userProfile);
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
      if (errorAddPhoto?.response?.status === 400) {
        check400Error(errorAddPhoto, 'image');
      } else {
        checkServerError(errorAddPhoto);
      }
      checkServerError(errorRemovePhoto);
    }

    if (dataRemovePhoto) {
      Alert.alert('Photo Removed', dataRemovePhoto.detail, [
        {
          text: 'Ok',
          onPress: () => {
            dispatch({ type: c.USER_REMOVE_PHOTO_RESET });
          },
        },
      ]);
    }

    if (dataAddPhoto) {
      Alert.alert('Photo added', 'well done', [
        {
          text: 'Ok',
          onPress: () => {
            dispatch({ type: c.USER_ADD_PHOTO_RESET });
          },
        },
      ]);
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
    props.navigation.navigate('SwipeProfile', {
      mainProfileId: userProfile.id,
      isInGroup: userProfile.is_in_group,
      isMyProfile: true,
    });
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={loadProfile} />
      }
      contentContainerStyle={styles.scroll_container_style}
      style={styles.scrollview_style}>
      <TouchableOpacity
        style={styles.profilePictureContainer}
        onPress={handleOpenPreview}>
        {photos?.length > 0 ? (
          <FastImage
            source={{
              uri: `${getImage(Object.values(photos)[0].image)}`,
              priority: FastImage.priority.high,
            }}
            style={styles.image}
          />
        ) : (
          <Loader />
        )}
        {userProfile && photos?.length <= 0 && (
          <View style={styles.avatar_view}>
            <Text style={styles.avatar_initials}>
              {getNameInitials(userProfile.name)}
            </Text>
          </View>
        )}
      </TouchableOpacity>
      {userProfile ? (
        <NameCounter
          name={userProfile.name}
          total_likes={userProfile.total_likes}
          total_matches={userProfile.total_matches}
          navigation={props.navigation}
        />
      ) : (
        <Loader />
      )}
      <View>
        <ProfileGallery
          photos={photos}
          onAddPhoto={handleAddPhoto}
          setPhotoId={setPhotoId}
          photoId={photoId}
          loadingPhotos={loadingPhotos}
          handleActionSheet={onOpenActionSheet}
        />
      </View>
      <FooterProfile handleOpenPreview={handleOpenPreview} />
    </ScrollView>
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
            navData.navigation.navigate('Swipe');
          }}
          title="Back arrow"
        />
      </HeaderButtons>
    ),
  };
};

export default MyProfileScreen;
