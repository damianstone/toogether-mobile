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
// TODO: handle if its match

const Deck = (props) => {
  const {
    swipeProfiles,
    setShowMode,
    showMode, // check to show a profile or a new match modal
    setAllCardsSwiped,
    renderNewMatch,
    showProfileHandler,
  } = props;

  const swipeRef = useRef();
  const currentDeckIndex = useRef(0);

  // Swiper actions
  const handleLike = (index) => {
    console.log('LIKE');
    const likedProfile = swipeProfiles[index];

    console.log(swipeProfiles[index]);

    // TODO: dispatch like

    currentDeckIndex.current = index;
  };

  const handleDislike = (index) => {
    currentDeckIndex.current = index;
  };

  // Buttons actions
  const onLikePressed = () => {
    // swipeLeft() function activates the onLike function
    swipeRef.current.swipeLeft();
  };

  const onDislikePressed = () => {
    swipeRef.current.swipeRight();
  };

  const onRewindPressed = () => {
    swipeRef.current.swipeBack((index) => {
      const prevDeckItem = swipeProfiles[index - 1];

      currentDeckIndex.current = index;
    });
  };

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
              title: 'DISLIKE',
              style: {
                label: {
                  textAlign: 'right',
                  color: Colors.red,
                  fontSize: 25,
                },
              },
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  textAlign: 'left',
                  color: Colors.calypso,
                  fontSize: 25,
                },
              },
            },
          }}
          onSwipedLeft={handleDislike}
          onSwipedRight={handleLike}
          onSwipedTop={handleLike}
          onSwipedBottom={handleDislike}
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
