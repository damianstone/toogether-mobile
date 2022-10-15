import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Modal } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useDispatch, useSelector } from 'react-redux';

import tw from 'tailwind-rn';
import SwipeCard from '../../components/SwipeCard';
import SwipeButtons from '../../components/SwipeButtons';
import Colors from '../../constants/Colors';
import styles from './styles';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

// TODO: handle likes
// TODO:

const Deck = (props) => {
  const {
    swipeProfiles,
    setShowMode,
    showMode, // check to show a profile or a new match modal
    setAllCardsSwiped,
    onUndoSwipe,
    onSwipe,
    renderNewMatch,
    showProfileHandler,
  } = props;

  const swipeRef = useRef();
  const currentDeckIndex = useRef(0);

  // TODO: Handle swipe functions ----------------------------
  const handleSwipe = (type, index) => {
    // just the current profile or group that just swiped
    const currentDeckItem = swipeProfiles[index];

    currentDeckIndex.current = index;
  };

  const undoSwipe = () => {
    swipeRef.current.swipeBack((index) => {
      const prevDeckItem = swipeProfiles[index - 1];

      currentDeckIndex.current = index;
      onUndoSwipe(prevDeckItem);
    });
  };

  // TODO: Buttons functions swipe ----------------------------
  const onLikePressed = () => {
    swipeRef.current.swipeLeft();
  };

  const onDislikePressed = () => {
    swipeRef.current.swipeRight();
  };

  const onRewindPressed = () => {
    swipeRef.current.swipeBack();
  };

  // TODO: Finger swipe actions ----------------------------
  const onSwipedLeft = (index) => {
    handleSwipe('Dislike', index);
  };

  const onSwipedRight = (index) => {
    handleSwipe('Like', index);
  };

  // TODO: Render functions ----------------------------

  // render a card with the profiles (single and group)
  const renderCard = (profile) => {
    return (
      <SwipeCard
        key={profile.id}
        isGroup={'members' in profile}
        profile={profile}
        showProfileHandler={showProfileHandler}
        setShowMode={setShowMode}
        onSwipeRight={onLikePressed}
        onSwipeLeft={onDislikePressed}
      />
    );
  };

  // dependiendo del showMode deberia retornar
  // 0 swipe
  // 1 mostrar el perfil especfico de la persona
  // 2 new match screen
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.swipeContainer}>
        <Swiper
          containerStyle={tw('bg-transparent')}
          cards={swipeProfiles}
          ref={swipeRef}
          stackSize={2}
          cardIndex={0}
          verticalSwipe
          infinite={false}
          stackAnimationFriction={10}
          showSecondCard
          animateCardOpacity
          animateOverlayLabelsOpacity
          swipeBackCard
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  textAlign: 'right',
                  color: 'red',
                },
              },
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  textAlign: 'left',
                  color: 'green',
                },
              },
            },
          }}
          onSwipedLeft={onSwipedLeft}
          onSwipedRight={onSwipedRight}
          renderCard={renderCard}
          onSwipedAll={() => setAllCardsSwiped(true)}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <SwipeButtons
          rewind
          onLeft={onLikePressed}
          onRight={onDislikePressed}
          onRewind={onRewindPressed}
        />
      </View>
      {showMode === 2 && (
        <Modal
          transparent={false}
          visible={showMode === 2}
          animationType="slide">
          <View
            style={{
              width: SCREEN_WIDTH,
              height: SCREEN_HEIGHT,
              backgroundColor: 'white',
            }}>
            {renderNewMatch()}
          </View>
        </Modal>
      )}
    </View>
  );
};

export default Deck;
