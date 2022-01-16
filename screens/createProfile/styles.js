import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  titleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    color: Colors.white,
    textAlign: 'center',
  },
  wrapper: {
    padding: 20,
  },
  photoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  photo: {
    width: 150,
    height: 150,
    borderRadius: 30,
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    color: Colors.white,
    fontSize: 15,
  },
  inputStyle: {
    height: 100,
    justifyContent: 'flex-start',
    padding: 3,
  },
  buttonContainer: {
    alignItems: 'center',
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    width: '65%',
    height: 44,
    backgroundColor: Colors.orange,
    borderRadius: 22,
  },
});
