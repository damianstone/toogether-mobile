import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import FastImage from 'react-native-fast-image';

import { listUserPhotos } from '../../store/actions/user';
import { getNameInitials, getImage } from '../../utils/getMethods';
import Colors from '../../constants/Colors';
import Loader from '../UI/Loader';

const Avatar = ({ onPress }) => {
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userGetProfile);
  const userListPhotos = useSelector((state) => state.userListPhotos);

  const { data: dataProfile, loading: loadingProfile } = userProfile;

  const { data: photos, loading: loadingPhoto } = userListPhotos;

  useEffect(() => {
    if (!photos) {
      dispatch(listUserPhotos());
    }
  }, []);

  if (loadingProfile || loadingPhoto) {
    return (
      <TouchableOpacity onPress={onPress} style={styles.imgContainer}>
        <View style={styles.error_avatar_view}>
          <Loader />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} style={styles.imgContainer}>
      {photos?.length > 0 && (
        <View style={styles.avatar_view}>
          <FastImage
            source={{
              uri: `${getImage(photos[0].image)}`,
              priority: FastImage.priority.high,
            }}
            style={styles.img}
          />
        </View>
      )}
      {(photos?.length === 0 || !photos) && dataProfile && (
        <View style={styles.avatar_view}>
          <Text style={styles.avatar_initials}>
            {getNameInitials(dataProfile.name)}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  imgContainer: {
    width: 40,
    height: 40,
    overflow: 'hidden',
    marginLeft: 10,
    borderRadius: 100,
  },
  img: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.bgCard,
  },

  avatar_view: {
    backgroundColor: Colors.orange,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error_avatar_view: {
    backgroundColor: Colors.bgCard,
    opacity: 0.5,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar_initials: {
    color: Colors.white,
    fontSize: 18,
  },
});
