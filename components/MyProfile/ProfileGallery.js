import React from 'react';
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
  StyleSheet,
  RefreshControl,
  Dimensions,
} from 'react-native';
import Colors from '../../constants/Colors';
const { width } = Dimensions.get('window');
import { BASE_PHOTOS } from '../../data/base_fotos';

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
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
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
              style={{
                ...styles.myphotosItemView,
                backgroundColor: Colors.bgCard,
              }}
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
    backgroundColor: 'grey',
    overflow: 'hidden',
  },
  myphotosView: {
    width: '100%',
    paddingHorizontal: 2,
    marginTop: 20,
    marginBottom: 15,
    alignItems: 'center',
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
    flex: 3,
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
    backgroundColor: 'grey',
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
  inactiveDot: {
    backgroundColor: Colors.white,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  buttonText: {
    fontSize: 17,
    color: Colors.white,
    fontWeight: '500',
  },
  linearGradientButton: {
    position: 'absolute',
    width: 250,
    height: 40,
  },
});
export default ProfileGallery;
