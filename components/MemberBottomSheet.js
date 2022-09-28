import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import BottomSheet, { BottomSheetFooter } from '@gorhom/bottom-sheet';

import MemberAvatar from './MemberAvatar';
import Colors from '../constants/Colors';

const MemberBottomSheet = (props) => {
  // ref
  const bottomSheetRef = useRef(null);
  const HEIGHT_MEMBER_CARD_CONTAINER = props.isOwner ? '30%' : '40%';

  const snapPoints = useMemo(
    () => [HEIGHT_MEMBER_CARD_CONTAINER, HEIGHT_MEMBER_CARD_CONTAINER],
    []
  );
  const renderMemberItem = ({ item, index, separators }) => {
    if (props.ownerProfile && item.id === props.ownerProfile.id) {
      return null;
    }
    return (
      <View style={styles.flatlist_item_container}>
        <MemberAvatar
          photos={item.photos}
          onPress={() => (props.isOwner ? props.onActionSheet : null)}
        />
        <Text style={styles.firstname_text}>{item.firstname}</Text>
      </View>
    );
  };
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      backgroundStyle={Colors.bgCard}
      handleStyle={{ backgroundColor: Colors.bgCard }}>
      {props.group && (
        <FlatList
          style={{ backgroundColor: Colors.bgCard }}
          nestedScrollEnabled
          data={props.group.members}
          renderItem={renderMemberItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </BottomSheet>
  );
};

export default MemberBottomSheet;

const styles = StyleSheet.create({
  firstname_text: {
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 12,
    color: Colors.bg,
  },
  flatlist_item_container: {
    width: 70,
    height: 70,
    alignItems: 'center',
  },
});
