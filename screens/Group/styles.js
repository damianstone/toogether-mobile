import { Dimensions, Platform, StyleSheet } from 'react-native';
import { linear } from 'react-native/Libraries/Animated/Easing';
import Colors from '../../constants/Colors';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  /* ----------------------- JOIN GROUP SCREEN ---------------------- */
  screen: {
    backgroundColor: Colors.bg,
    justifyContent: 'space-between',
    flexDirection: 'column',
    height: '100%',
  },

  loadingScreen: {
    backgroundColor: Colors.bg,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  gradient: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  scrollview_style: {
    flexGrow: 1,
    backgroundColor: Colors.bg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 0,
  },

  scrollview_content_container: {
    flexDirection: 'column', // inner items will be added vertically
    flexGrow: 1, // all the available vertical space will be occupied by it
    justifyContent: 'space-between', // will create the gutter between body and footer
  },

  join_text_view: {
    padding: 10,
  },

  join_text_container: {
    width: '100%',
  },

  join_text_big: {
    color: Colors.white,
    fontSize: 35,
    fontWeight: 'bold',
  },

  join_text_small: {
    color: Colors.white,
    fontSize: 25,
  },

  imageContainer: {
    height: '60%',
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },

  image: {
    width: '100%',
    height: 400,
  },

  join_input_container: {
    backgroundColor: Colors.bg,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: '2%',
    marginBottom: 20,
  },

  label: {
    color: Colors.white,
    fontSize: 18,
  },

  join_loader_container: {
    marginVertical: 30,
    padding: 3,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },

  join_button_container: {
    marginVertical: 30,
    marginBottom: 20,
    padding: 3,
    flexDirection: 'row',
    width: '100%',
    height: 44,
    backgroundColor: Colors.orange,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  join_text_button: {
    color: '#4A4A4A',
    fontSize: 15,
  },
  /* ----------------------- GROUP SCREEN ---------------------- */
});
