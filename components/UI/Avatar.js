import React, { useEffect } from 'react';
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

const Avatar = (props) => {
  const BASE_URL = Constants.manifest.extra.BUCKET_URL;
  const dispatch = useDispatch();
  const userPhotos = useSelector((state) => state.userListPhotos);
  const { loading, error, data } = userPhotos;

  useEffect(() => {
    if (!data) {
      dispatch(listUserPhotos());
      dispatch(getUserProfile());
    }
  }, []);

  return (
    <TouchableOpacity onPress={props.onPress} style={styles.imgContainer}>
      {loading && <ActivityIndicator />}
      {data && Object.values(data).length > 0 && (
        <Image
          source={{ uri: `${Object.values(data)[0].image}` }}
          style={styles.img}
        />
      )}
      {!data ||
        (Object.values(data).length === 0 && (
          <View style={styles.avatar_view}>
            <Text style={styles.avatar_initials}>DS</Text>
          </View>
        ))}
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
  avatar_initials: {
    color: Colors.white,
    fontSize: 18,
  },
});
