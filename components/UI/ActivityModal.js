import React from 'react';
import { StyleSheet, View, Text, Modal, ActivityIndicator } from 'react-native';

const ActivityModal = ({
  loading = false,
  activityColor,
  activityWrapperStyle,
  size,
  opacity = 0.4,
  title = '',
  titleColor,
}) => {
  return (
    <Modal transparent animationType="none" visible={loading}>
      <View
        style={[
          styles.modalBackground,
          { backgroundColor: `rgba(0,0,0,${opacity})` },
        ]}
      >
        <View style={[styles.activityIndicatorWrapper, activityWrapperStyle]}>
          <ActivityIndicator
            animating={loading}
            activityColor={activityColor}
            size={size}
            color={activityColor}
          />
          <Text style={[styles.title, { color: titleColor }]} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicatorWrapper: {
    height: 100,
    width: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    paddingTop: 8,
  },
});

export default ActivityModal;
