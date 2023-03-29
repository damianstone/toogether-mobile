import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Colors from '../../constants/Colors';
import ActivityModal from '../../components/UI/ActivityModal';

const TransparentLoader = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.screen}>
        <ActivityModal
          loading
          title="Loading"
          size="small"
          activityColor="white"
          titleColor="white"
          activityWrapperStyle={{
            backgroundColor: 'transparent',
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {},
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    bottom: 10,
  },
});

export default TransparentLoader;
