import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default StyleSheet.create({
  screen: {
    backgroundColor: Colors.bg,
    flex: 1,
    justifyContent: 'space-around',
    height: '100%',
  },
  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ---------------------- AUTH START SCREEN -----------------------

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

  button: {
    fontSize: 60,
    color: Colors.white,
  },

  inputsContainer: {
    padding: 3,
    width: '80%',
    marginVertical: 0,
    alignSelf: 'center',
  },

  buttonContainer2: {
    marginVertical: 30,
    padding: 3,
    flexDirection: 'row',
    width: '80%',
    height: 44,
    backgroundColor: Colors.orange,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // ---------------------- AUTH SCREEN -----------------------

  scrollview_auth: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },

  auth_text_view: {
    marginTop: 80,
    padding: 15,
  },

  auth_text_container: {
    width: '100%',
  },

  auth_text_big: {
    color: Colors.white,
    fontSize: 40,
    fontWeight: 'bold',
  },

  auth_text_small: {
    color: Colors.white,
    fontSize: 28,
  },

  auth_input_container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',

    width: '100%',
    height: '100%',
    padding: 20,
  },

  inputStyle: {
    padding: 5,
    backgroundColor: '#494863',
    borderRadius: 10,
    justifyContent: 'center',
  },

  label: {
    color: Colors.white,
    fontSize: 20,
    marginTop: 10,
  },

  auth_button_container: {
    marginVertical: 30,
    padding: 3,
    flexDirection: 'row',
    width: '100%',
    height: 44,
    backgroundColor: Colors.orange,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
