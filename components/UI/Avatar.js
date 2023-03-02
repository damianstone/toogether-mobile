import React, { useEffect, useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Context } from '../../context/ContextProvider';
import Colors from '../../constants/Colors';
import { getUserProfile } from '../../store/actions/user';
import { getGroup } from '../../store/actions/group';

import Loader from './Loader';

const Avatar = (props) => {
  const { onPress } = props;
  const {
    profileContext,
    updateProfileContext,
  } = useContext(Context);

  const dispatch = useDispatch();

  const userProfile = useSelector((state) => state.userGetProfile);
  const {
    loading: loadingProfile,
    error: errorProfile,
    data: dataProfile,
  } = userProfile;

  useEffect(() => {
    if (!dataProfile && !profileContext) {
      dispatch(getUserProfile());
    }
    if (dataProfile) {
      updateProfileContext(dataProfile);
    }
  }, []);

  const getInitials = (name) => {
    const first = name ? name.charAt(0).toUpperCase() : 'N';
    return first;
  };

  return (
    <TouchableOpacity onPress={onPress} style={styles.imgContainer}>
      {loadingProfile ||
        (typeof errorProfile != 'undefined' && (
          <View style={styles.error_avatar_view}>
            <Loader />
          </View>
        ))}
      {dataProfile && dataProfile.photos.length > 0 && (
        <View style={styles.avatar_view}>
          <Image
            source={{ uri: `${dataProfile.photos[0].image}` }}
            style={styles.img}
          />
        </View>
      )}
      {dataProfile?.photos?.length === 0 && (
        <View style={styles.avatar_view}>
          <Text style={styles.avatar_initials}>
            {getInitials(dataProfile.name)}
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
