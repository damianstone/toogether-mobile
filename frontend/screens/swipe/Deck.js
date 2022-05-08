import { StyleSheet, Text, View, Dimensions, Modal } from 'react-native';
import React, { useRef } from 'react';
import Swiper from 'react-native-deck-swiper';
import tw from 'tailwind-rn';
import { useSelector } from 'react-redux';

import SwipeCard from '../../components/SwipeCard';
import SwipeButtons from '../../components/SwipeButtons';
import ProfileModal from './ProfileModal';
import styles from './styles';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

/* 

Deck - muestra los grupos o perfiles individuales

componente del swipeScreen 
basicamente toda la implementacion del swipe

manejo de los swipes, que pasa si es un like, que pasa si es dislike, etc

muestra los perfiles, grupos y llama a la funcion newmatch si es que hay un match lo que renderiza 
en pantalla completa newmatchscren

llama a la funcion renderEmpy, que muestra cuando no hay mas perfiles que mostrar

*/

const Deck = (props) => {
  // PROPS
  const {
    data, // total groups or profiles to swipe
    setShowMode, // set show mode
    onUndoSwipe, //
    onSwipe, //
    showMode, // check to show a profile or a new match modal
    onAllCardsSwiped, //
    renderEmptyState, //
    renderNewMatch, //
    showProfileHandler, //
  } = props;

  // REF
  const swipeRef = useRef(null);
  const currentDeckIndex = useRef(0);

  // HANDLE SWIPE
  const handleSwipe = (type, index) => {
    const currentDeckItem = data[index];

    currentDeckIndex.current = index;
  };

  // REWIND SWIPE
  const undoSwipe = () => {
    useSwiper.current.swipeBack((index) => {
      const prevDeckItem = data[index - 1];

      currentDeckIndex.current = index;
      onUndoSwipe(prevDeckItem);
    });
  };

  const onLikePressed = () => {
    swipeRef.current.swipeLeft();
  };

  const onDislikePressed = () => {
    swipeRef.current.swipeRight();
  };

  const onRewindPressed = () => {
    swipeRef.current.swipeBack();
  };

  const onSwipedLeft = (index) => {
    handleSwipe('Dislike', index);
  };

  const onSwipedRight = (index) => {
    handleSwipe('Like', index);
  };

  const onSwipedAll = () => {
    onAllCardsSwiped();
  };

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
    const name = 'NAME GROUP'
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

  if (data.length === 0) {
    return <View>{renderEmptyState()}</View>;
  }

  // dependiendo del showMode deberia retornar
  // 0 swipe
  // 1 mostrar el perfil especfico de la persona
  // 2 new match screen
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.swipeContainer}>
        <Swiper
          containerStyle={tw('bg-transparent')}
          showSecondCard={true}
          cards={data}
          ref={swipeRef}
          stackSize={3}
          cardIndex={0}
          verticalSwipe={false}
          stackAnimationFriction={10}
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
          onSwipedAll={onSwipedAll}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <SwipeButtons
          rewind={true}
          onLeft={onLikePressed}
          onRight={onDislikePressed}
          onRewind={onRewindPressed}
        />
      </View>
      {/* PROBLE RENDERIZAR SHOW PRPFILE  */}
      {showMode == 1 && data[currentDeckIndex.current] && (
        <Modal animationType={'slide'}>{renderProfile}</Modal>
      )}
      {showMode == 2 && (
        <Modal
          transparent={false}
          visible={showMode == 2 ? true : false}
          animationType={'slide'}>
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
