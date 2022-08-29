import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { listUserPhotos } from '../../store/actions/user';

const Avatar = (props) => {
  const dispatch = useDispatch();
  const userPhotos = useSelector((state) => state.userListPhotos);
  const { loading, error, data } = userPhotos;

  useEffect(() => {
    dispatch(listUserPhotos());
  }, []);

  console.log('USER PHOTOS ---> ', data);

  return (
    <TouchableOpacity style={styles.imgContainer} onPress={props.onPress}>
      <Image source={''} style={styles.img} />
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
});
