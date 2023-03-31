import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import Colors from '../../constants/Colors';
import { BASE_PHOTOS } from '../../data/base_fotos';

const { width } = Dimensions.get('window');
const ProfileGallery = (props) => {
  const {
    photos,
    loadingAddPhoto,
    onAddPhoto,
    setPhotoId,
    photoId,
    renderPhoto,
  } = props;

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
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
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
