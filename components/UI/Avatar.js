import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Constants from 'expo-constants';
import Colors from '../../constants/Colors';
import { listUserPhotos, getUserProfile } from '../../store/actions/user';

import Loader from './Loader';

const Avatar = (props) => {
  const BASE_URL = Constants.manifest.extra.BUCKET_URL;
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  const userProfile = useSelector((state) => state.userGetProfile);
  const { loading, error: fetchError, data } = userProfile;

  useEffect(() => {
    if (!data) {
      dispatch(getUserProfile());
    }
  }, []);

  return (
    <TouchableOpacity onPress={props.onPress} style={styles.imgContainer}>
      {loading && <ActivityIndicator />}
      {data && data.photos.length > 0 && (
        <Image source={{ uri: `${data.photos[0].image}` }} style={styles.img} />
      )}
      {data === undefined ||
        (data?.photos.length === 0 && (
          <View style={styles.avatar_view}>
            <Text style={styles.avatar_initials}>DS</Text>
          </View>
        ))}
      {typeof fetchError != 'undefined' && (
        <View style={styles.error_avatar_view}>
          <Loader />
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
  },

  avatar_view: {
    backgroundColor: Colors.orange,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error_avatar_view: {
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
