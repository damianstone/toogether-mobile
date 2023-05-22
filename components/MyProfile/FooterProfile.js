import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');

const FooterProfile = (props) => {
  const { handleOpenPreview } = props;
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        onPress={handleOpenPreview}
        style={styles.previewButton}
      >
        <LinearGradient
          colors={['#ED665A', '#CF2A6E', '#BA007C']}
          style={styles.linearCircle}
        />
        <View style={styles.textButtonContainer}>
          <Text style={styles.textButton}>Profile Preview</Text>
        </View>
        <View style={styles.iconButtonContainer}>
          <Feather name="arrow-right" size={35} color={Colors.white} />
        </View>
      </TouchableOpacity>

      <View style={styles.logoSection}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/images/logo-2.png')}
            style={styles.logo}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    width: '100%',
    alignItems: 'center',
    flexDirection: 'column',
  },

  previewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    alignItems: 'center',
    borderRadius: 10,
    padding: 7,
  },

  textButtonContainer: {
    padding: 10,
  },

  textButton: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '500',
  },

  iconButtonContainer: {
    borderRadius: 100,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },

  linearCircle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 10,
    transform: [{ scaleX: 1 }],
  },

  logoSection: {
    marginTop: 2,
    marginBottom: 35,
    padding: 10,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    width: 120,
  },
  logo: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
  },
});
export default FooterProfile;
