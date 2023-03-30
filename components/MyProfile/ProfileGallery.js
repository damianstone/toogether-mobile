import noColorLiterals from 'eslint-plugin-react-native/lib/rules/no-color-literals';
import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
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
      <View style={styles.itemView}>
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
  myphotosItemView: {
    width: Math.floor(width * 0.29),
    height: Math.floor(width * 0.29),
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.bgCard,
    overflow: 'hidden',
  },
  myphotosView: {
    width: '100%',
    paddingHorizontal: 2,
    marginTop: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  myPhotosContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  itemView: {
    width: '100%',
    paddingVertical: 2,
    marginVertical: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginBottom: 11,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideActivity: {
    height: '100%',
    width: '90%',
  },
  flatlist_photos_style: {
    width: '100%',
  },
  flatlist_photos_container_style: {
    justifyContent: 'center',
  },

  photos_grid_view: {
    flex: 2,
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    marginHorizontal: 'auto',
  },

  myphotosItemView: {
    width: Math.floor(width * 0.29),
    height: Math.floor(width * 0.29),
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.bgCard,
    overflow: 'hidden',
  },
  optionView: {
    width: '100%',
    marginVertical: 9,
    paddingHorizontal: 2,
    flexDirection: 'row',
  },
  iconView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textLabel: {
    fontSize: 16,
    color: Colors.white,
  },
  photoTitleLabel: {
    fontWeight: '500',
    fontSize: 17,
    paddingLeft: 22,
    color: Colors.white,
  },
});
export default ProfileGallery;
