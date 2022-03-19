import { StyleSheet } from 'react-native';
import { borderRightColor, borderTopColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import Colors from '../../constants/Colors';

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    alignItems: 'center',
    alignContent: 'center',
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
  scroll: {
    padding: 10,  
    width: '95%',
    overflow: 'hidden'
  },
  contentContainer: {
    width: '100%',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  photoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    overflow: 'hidden'
  },
  photo: {
    width: 170,
    height: 170,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
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
    backgroundColor: '#494863',
    borderRadius: 20,
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    alignItems: 'center',
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
    width: '65%',
    height: 44,
    backgroundColor: Colors.green,
    borderRadius: 22,
  },
  buttonContainerNoValid: {
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
  touchable: {
    width: '100%',
    height: '100%',
  }
});
