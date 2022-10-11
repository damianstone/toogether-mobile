import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Modal,
  Share,
  SafeAreaView,
} from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { useDispatch, useSelector } from 'react-redux';
import tw from 'tailwind-rn';

import SwipeCard from '../../components/SwipeCard';
import SwipeButtons from '../../components/SwipeButtons';
import SwipeError from '../../components/SwipeError';
import ProfileModal from './ProfileModal';
import Colors from '../../constants/Colors';
import styles from './styles';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

/* 
Deck - muestra los grupos o perfiles individuales
*/

// TODO: handle likes
// TODO:

const Deck = (props) => {
  const {
    swipeProfiles, // total groups or profiles to swipe
    setShowMode, // set show mode
    setAllCardsSwiped,
    onUndoSwipe, //
    onSwipe, //
    showMode, // check to show a profile or a new match modal
    renderNewMatch, //
    showProfileHandler, //
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

  // in swipe card the user want to open a specific profile in the group
  // el id
  // NO WORK
  const renderProfile = (item, isDone) => {
    return (
      item && (
        <ProfileModal
          key={'CardDetail' + item.id}
          photosArr={item.photos}
          firstName={item.firstname}
          lastName={item.lastname}
          age={item.age}
          university={item.university}
          location={item.location}
          description={item.description}
          setShowMode={setShowMode}
          onSwipeRight={onLikePressed}
          onSwipeLeft={onDislikePressed}
          isDone={isDone}
        />
      )
    );
  };

  // render a card containing all of the profile members of the group
  const renderCard = (elem) => {
    // TRANFORM THE OBJECT INTO AN ARRAY WHEN IS NOT A GROUP?
    const name = 'NAME GROUP';
    return (
      <SwipeCard
        key={elem._id}
        firstName={name}
        profile={elem}
        onProfile={showProfileHandler}
        setShowMode={setShowMode}
        onSwipeRight={onLikePressed}
        onSwipeLeft={onDislikePressed}
        onRenderProfile={renderProfile}
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
      {/* PROBLE RENDERIZAR SHOW PRPFILE  */}
      {showMode === 1 && swipeProfiles[currentDeckIndex.current] && (
        <Modal animationType="slide">{renderProfile}</Modal>
      )}
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
