import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
  swipeContainer: {
    flex: 1,
    bottom: 35,
    width: '80%'

  },
  buttonsContainer: {
    marginVertical: 0,
    top: 5,
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
