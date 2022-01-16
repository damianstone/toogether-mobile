import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    bottom: 10,
  },
  swipeContainer: {
    flex: 1,
    bottom: '6%',
    width: '100%',
  },
  buttonsContainer: {
    marginVertical: 0,
    top: '2.5%',
  },
});
