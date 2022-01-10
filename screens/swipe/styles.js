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
    width: '100%',
    height: '100%',
    bottom: 10,
  }
});