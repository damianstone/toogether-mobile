import { Dimensions, Platform, StyleSheet } from 'react-native';
import { linear } from 'react-native/Libraries/Animated/Easing';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  /* ----------------------- PROFILE DATA ----------------------  */
  MainContainer: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: 'space-around',
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: Colors.bg,
    position: 'absolute',
  },
  body: {
    width: '100%',
  },
  scroll_container_style: {
    width: '100%',
    flexDirection: 'column', // inner items will be added vertically
    flexGrow: 1, // all the available vertical space will be occupied by it
    justifyContent: 'space-between', // will create the gutter between body and footer
  },
  photoView: {
    top: Platform.OS === 'ios' ? '4%' : '1%',
    width: 150,
    height: 150,
    borderRadius: 100,
    backgroundColor: 'grey',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  profilePictureContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 100,
  },
  avatar_view: {
    backgroundColor: Colors.orange,
    width: 150,
    height: 150,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar_initials: {
    color: Colors.white,
    fontSize: 25,
  },
  nameView: {
    flexDirection: 'row',
    width: '100%',
    marginTop: -5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    // marginRight: 10,
    color: Colors.white,
    padding: 10,
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  counterView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  likesNumber: {
    color: Colors.orange,
    fontSize: 24,
  },
  counterText: {
    color: Colors.white,
    fontSize: 14,
    marginTop: 5,
  },
  matchesNumber: {
    color: Colors.calypso,
    fontSize: 24,
  },

  /* ----------------------- PHOTOS-----------------------  */
  myphotosView: {
    width: '100%',
    paddingHorizontal: 2,
    marginTop: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  itemView: {
    width: '100%',
    paddingVertical: 2,
    marginVertical: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginBottom: 11,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slideActivity: {
    height: '100%',
    width: '90%',
  },
  flatlist_photos_style: {
    width: '100%',
  },
  flatlist_photos_container_style: {
    justifyContent: 'center',
  },
  photos_grid_view: {
    flex: 3,
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    marginHorizontal: 'auto',
  },
  myphotosItemView: {
    width: Math.floor(width * 0.29),
    height: Math.floor(width * 0.29),
    marginHorizontal: 8,
    marginVertical: 8,
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'grey',
    overflow: 'hidden',
  },
  optionView: {
    width: '100%',
    marginVertical: 9,
    paddingHorizontal: 2,
    flexDirection: 'row',
  },
  iconView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textLabel: {
    fontSize: 16,
    color: Colors.white,
  },
  photoTitleLabel: {
    fontWeight: '500',
    fontSize: 17,
    paddingLeft: 22,
    color: Colors.white,
  },
  inactiveDot: {
    backgroundColor: Colors.white,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  buttonText: {
    fontSize: 17,
    color: Colors.white,
    fontWeight: '500',
  },
  linearGradientButton: {
    position: 'absolute',
    width: 250,
    height: 40,
  },

  /* ----------------------- TOOGETHER PREMIUM-----------------------  */
  circle: {
    marginTop: 20,
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    transform: [{ scaleX: 1 }],
  },
  linearCircle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 20,
    transform: [{ scaleX: 1 }],
  },
  logoContainer: {
    marginVertical: 10,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logo: {
    alignSelf: 'center',
    width: 150,
    height: 40,
    resizeMode: 'stretch',
  },
  proText: {
    color: Colors.white,
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 10,
    fontWeight: '600',
  },
  buttonPremiumContainer: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonPremiumView: {
    overflow: 'hidden',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 250,
    borderRadius: 20,
  },
  /* ----------------------- EDIT PROFILE SCREEN -----------------------  */

  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  loadingScreen: {
    backgroundColor: Colors.bg,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editContainer: {
    margin: 20,
    paddingHorizontal: 2,
    justifyContent: 'center',
    alignContent: 'center',
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    color: Colors.white,
    fontSize: 20,
  },
  inputStyle: {
    justifyContent: 'center',
    padding: 3,
    backgroundColor: Colors.bgCard,
    borderRadius: 10,
  },
  desabledInputStyle: {
    justifyContent: 'center',
    padding: 3,
    backgroundColor: '#363648',
    borderRadius: 10,
  },
  textTareaStyle: {
    height: 150,
    justifyContent: 'flex-start',
    padding: 3,
    backgroundColor: Colors.bgCard,
    borderRadius: 20,
  },
  textArea: {
    height: 200,
    textAlignVertical: 'top',
  },
});
