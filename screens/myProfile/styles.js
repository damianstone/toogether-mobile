import { StyleSheet, Platform, Dimensions } from 'react-native';
import { linear } from 'react-native/Libraries/Animated/Easing';
import Colors from '../../constants/Colors';

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  MainContainer: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  body: {
    width: '100%',
  },
  photoView: {
    top: Platform.OS === 'ios' ? '4%' : '1%',
    width: 146,
    height: 146,
    borderRadius: 73,
    backgroundColor: 'grey',
    overflow: 'hidden',
    alignSelf: 'center',
  },
  profilePictureContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  nameView: {
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
  myphotosItemView: {
    width: Math.floor(width * 0.24),
    height: Math.floor(width * 0.24),
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
  logoutView: {
    width: '92%',
    marginTop: 20,
    marginBottom: 50,
    marginHorizontal: 12,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
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

  circle: {
    marginTop: 20,
    height: '100%',
    width: '160%',
    borderRadius: 300,
    //backgroundColor: '#494863',
    alignSelf: 'center',
    alignItems: 'center',
    transform: [{ scaleX: 1 }],
  },
  linearCircle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: 300,
    transform: [{ scaleX: 1 }],
  },
  logoContainer: {
    marginVertical: 20,
    marginTop: 40,
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

  settingContainer: {
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
    fontSize: 18,
  },
  inputStyle: {
    justifyContent: 'center',
    padding: 3,
    backgroundColor: '#494863',
    borderRadius: 20,
  },
  textTareaStyle: {
    height: 150,
    justifyContent: 'flex-start',
    padding: 3,
    backgroundColor: Colors.bgCard,
    borderRadius: 20,
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
});
