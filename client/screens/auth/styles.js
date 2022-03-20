import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default StyleSheet.create({
  screen: {
    backgroundColor: Colors.bg,
    flex: 1,
    justifyContent: 'space-around',
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: 80,
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 350,
    height: 90,
    resizeMode: 'stretch',
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
    alignItems: 'center',
    marginVertical: 40,
  },
  buttonContainer: {
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    width: '65%',
    height: 44,
    backgroundColor: '#4267B2',
    borderRadius: 22,
    alignItems: 'center',
  },
  buttonContainer2: {
    padding: 3,
    flexDirection: 'row',
    marginVertical: 10,
    width: '65%',
    height: 44,
    backgroundColor: Colors.white,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    fontSize: 60,
    color: Colors.white,
  },
});
