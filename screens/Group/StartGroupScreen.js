import React, { useState } from 'react';
import {
  Image,
  View,
  Button,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import AuthButton from '../../components/UI/AuthButton';
import Avatar from '../../components/UI/Avatar';
import Colors from '../../constants/Colors';

const StartGroupScreen = (props) => {
  const handleCreateGroup = () => {
    // TODO: use replace instead of navigate
    props.navigation.navigate('Group');
  };

  const handleJoinToGroup = () => {
    props.navigation.navigate('JoinGroup');
  };

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <ScrollView
        style={styles.scrollview_style}
        contentContainerStyle={styles.scrollview_content_container}>
        <View>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/balls_group.png')}
              style={styles.image}
            />
          </View>
        </View>
        <View style={styles.buttonsContainer}>
          <Button
            title="Join to group"
            color={Colors.white}
            onPress={handleJoinToGroup}
          />
          <AuthButton onPress={handleCreateGroup} text="Create group" />
        </View>
      </ScrollView>
    </View>
  );
};

StartGroupScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Group',
    headerLeft: () => (
      <Avatar
        onPress={() => {
          navData.navigation.navigate('MyProfile');
        }}
      />
    ),
  };
};

export default StartGroupScreen;

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.bg,
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
  },

  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollview_style: {
    flexGrow: 1,
    backgroundColor: Colors.bg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 0,
  },

  scrollview_content_container: {
    flexDirection: 'column', // inner items will be added vertically
    flexGrow: 1, // all the available vertical space will be occupied by it
    justifyContent: 'space-between', // will create the gutter between body and footer
  },

  imageContainer: {
    marginTop: 20,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    width: '100%',
    height: 400,
  },

  buttonsContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    padding: 20,
    paddingVertical: '7%',
  },

  button: {
    fontSize: 60,
    color: Colors.white,
  },

  inputsContainer: {
    padding: 3,
    width: '80%',
    marginVertical: 0,
    alignSelf: 'center',
  },
});
