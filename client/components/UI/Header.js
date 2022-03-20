import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

const Header = (props) => {
  return (
    <View style={styles.logoContainer}>
      <Image
        source={require('../../assets/images/logo-1.png')}
        style={styles.logo}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  logoContainer: {
    marginTop: 35,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logo: {
    width: 70,
    height: 40,
  },
});
