import React, { useEffect, useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Context } from '../../context/ContextProvider';
import Colors from '../../constants/Colors';
import { getUserProfile } from '../../store/actions/user';

import Loader from './Loader';

const Avatar = (props) => {
  const { onPress } = props;

  const { currentProfile, updateCurrentProfile } = useContext(Context);
  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userGetProfile);
  const { loading, error: fetchError, data } = userProfile;

  useEffect(() => {
    if (!data && !currentProfile) {
      dispatch(getUserProfile());
    }
    if (data) {
      updateCurrentProfile(data);
    }
  }, []);

  const getInitials = (name) => {
    const first = name ? name.charAt(0).toUpperCase() : 'N';
    return first;
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.imgContainer}>
      {loading ||
        (typeof fetchError != 'undefined' && (
          <View style={styles.error_avatar_view}>
            <Loader />
          </View>
        ))}
      {data && data.photos.length > 0 && (
        <View style={styles.avatar_view}>
          <Image
            source={{ uri: `${data.photos[0].image}` }}
            style={styles.img}
          />
        </View>
      )}
      {data?.photos?.length === 0 && (
        <View style={styles.avatar_view}>
          <Text style={styles.avatar_initials}>{getInitials(data.name)}</Text>
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
