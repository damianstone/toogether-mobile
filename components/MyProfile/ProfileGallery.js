import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import Colors from '../../constants/Colors';
import { BASE_PHOTOS } from '../../data/base_fotos';
import { getImage } from '../../utils/getMethods';
import Loader from '../UI/Loader';

const { width } = Dimensions.get('window');

const ProfileGallery = ({
  photos,
  loadingAddPhoto,
  onAddPhoto,
  setPhotoId,
  photoId,
  handleActionSheet,
}) => {
  const renderPhoto = (photo) => {
    return (
      <TouchableOpacity
        key={photo.id}
        onPress={() => handleActionSheet(photo.id)}
        style={[styles.myphotosItemView]}
      >
        {loadingAddPhoto && photo.id === photoId ? (
          <Loader size="small" />
        ) : (
          <FastImage
            source={{
              uri: `${getImage(photo.image)}`,
              priority: FastImage.priority.high,
            }}
            style={styles.image}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.myphotosView}>
      <View style={styles.titleView}>
        <Text style={styles.photoTitleLabel}>My Photos</Text>
      </View>
      <View style={styles.myPhotosContainer}>
        {BASE_PHOTOS.map((item, index) =>
          photos && photos[index] ? (
            renderPhoto(photos[index], item.id)
          ) : (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                onAddPhoto();
                setPhotoId(item.id);
              }}
              style={styles.myphotosItemView}
            >
              <View style={styles.imagePlaceholder}>
                {loadingAddPhoto && item.id === photoId ? (
                  <Loader size="small" />
                ) : (
                  <Text style={{ color: Colors.white }}>Add Photo 📸</Text>
                )}
              </View>
            </TouchableOpacity>
          )
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  myphotosView: {
    height: '40%',
    width: '100%',
    paddingHorizontal: 2,
    marginTop: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  titleView: {
    width: '100%',
    paddingVertical: 2,
    marginVertical: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginBottom: 11,
  },
  image: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.bgCard,
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoTitleLabel: {
    fontWeight: '500',
    fontSize: 17,
    paddingLeft: 22,
    color: Colors.white,
  },
  myPhotosContainer: {
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'center',
  },
  myphotosItemView: {
    width: Math.floor(width * 0.29),
    height: Math.floor(width * 0.29),
    marginHorizontal: 4,
    marginVertical: 4,
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.bgCard,
    overflow: 'hidden',
  },
});
export default ProfileGallery;
