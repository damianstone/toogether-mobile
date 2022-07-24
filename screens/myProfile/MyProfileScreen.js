import {
  Text,
  View,
  Platform,
  ScrollView,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState, useRef, useDispatch, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { LinearGradient } from 'expo-linear-gradient';
import { useActionSheet } from '@expo/react-native-action-sheet';

import HeaderButtom from '../../components/UI/HeaderButton';
import ActivityModal from '../../components/UI/ActivityModal';
import styles from './styles';
import Colors from '../../constants/Colors';
import axios from 'axios';

/* 
MyProfileScreen

where the user can see their profile

Receive the profile object from... (?)

Support the following changes to the profile
- remove and add new photo

redirects to
- setting screen 
- toogether pro explanation website

*/

const MyProfileScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [photos, setPhotos] = useState([])
  const { showActionSheetWithOptions } = useActionSheet();

    useEffect(() => {
      setLoading(true);
      const fetchUser = async () => {
        // no write the entire url because the other part of the url is in proxy packajge.json
        const { data } = await axios.get('http://127.0.0.1:8000/api/profiles/1');
        setUser(data);
        setPhotos(`http://127.0.0.1:8000${user.photo}`)
      };
      fetchUser();
      setLoading(false);
    }, []);

  const onOpenUploadPhotoActionSheet = () => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = ['From Camera', 'Upload from Gallery', 'Cancel'];
    const destructiveButtonIndex = 0;
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 2) console.log('cancel');
      }
    );
  };

  const onOpenActionSheet = () => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = [
      'Make Profile Picture',
      'Add New Photo',
      'Remove Photo',
      'Cancel',
    ];
    const destructiveButtonIndex = 2;
    const cancelButtonIndex = 3;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
        destructiveButtonIndex,
      },
      (buttonIndex) => {
        if (buttonIndex === 1) onOpenUploadPhotoActionSheet();
      }
    );
  };

  return (
    <View style={styles.MainContainer}>
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.MainContainer}>
          <ScrollView style={styles.body}>
            {/* MAIN FOTOS AND COUNTERS */}
            <View style={styles.profilePictureContainer}>
              <Image
                style={{ width: 150, height: 150, borderRadius: 100 }}
                source={require('../../assets/images/Profiles/user.jpeg')}
              />
            </View>
            <View style={styles.nameView}>
              <Text style={styles.name}>Damian Stone</Text>
            </View>
            <View style={styles.counterContainer}>
              <View style={styles.counterView}>
                <Text style={styles.likesNumber}>100</Text>
                <Text style={styles.counterText}>Likes</Text>
              </View>
              <View style={styles.counterView}>
                <Text style={styles.matchesNumber}>320</Text>
                <Text style={styles.counterText}>matches</Text>
              </View>
            </View>

            {/* PHOTOS */}

            <View style={styles.myphotosView}>
              <View style={styles.itemView}>
                <Text style={styles.photoTitleLabel}>My Photos</Text>
              </View>
              <FlatList
                scrollEnabled={false}
                horizontal={false}
                numColumns={3}
                data={photos}
                keyExtractor={(item) => item}
                renderItem={(photo, index) => (
                  <TouchableOpacity
                    key={'item' + index}
                    style={styles.myphotosItemView}
                    onPress={onOpenActionSheet}>
                    <Image
                      style={{ width: '100%', height: '100%' }}
                      source={photo}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>

            {/* TOOGETHER PRO*/}
            <View style={styles.circle}>
              <LinearGradient
                colors={['#ED665A', '#CF2A6E', '#BA007C']}
                style={styles.linearCircle}
              />
              <View style={{alignItems: 'center'}}>
                <View style={styles.logoContainer}>
                  <Image
                    style={styles.logo}
                    source={require('../../assets/images/logo-2.png')}
                  />
                </View>
                <Text style={styles.proText}>
                  Enjoy unlimited likes and say goodbye to ads
                </Text>
                <View style={styles.buttonPremiumContainer}>
                  <TouchableOpacity
                    onPress={() => {}}
                    style={styles.buttonPremiumView}>
                    <LinearGradient
                      // Background Linear Gradient
                      colors={['#ED665A', '#CF2A6E', '#BA007C']}
                      style={styles.linearGradientButton}
                    />
                    <Text style={styles.buttonText}>Buy Toogether Premium</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

MyProfileScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'My Profile',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          title="Back arrow"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-arrow-back'}
          onPress={() => {
            // go to chat screen
            navData.navigation.navigate('Setting');
          }}
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButtom}>
        <Item
          title="Back arrow"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-arrow-back'}
          onPress={() => {
            // go to chat screen
            navData.navigation.navigate('Swipe');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default MyProfileScreen;

/*
          PICKERS AND MODALS NATIVE 
          <ActivityModal
            loading={loading}
            title="please wait"
            size={'large'}
            activityColor={'white'}
            titleColor={'white'}
            activityWrapperStyle={{
              backgroundColor: Colors.bg,
            }}
          />
          <ActionSheet
            ref={photoDialogActionSheetRef}
            title={'Photo Dialog'}
            options={['Remove Photo', 'Cancel', 'Make Profile Picture']}
            cancelButtonIndex={1}
            destructiveButtonIndex={0}
            onPress={() => {}}
          />
          <ActionSheet
            ref={photoUploadDialogActionSheetRef}
            title={'Photo Upload'}
            options={['Launch Camera', 'Open Photo Gallery', 'Cancel']}
            cancelButtonIndex={2}
            onPress={() => {}}
          />
*/
