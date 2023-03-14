import { StyleSheet, Text, View, Dimensions } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import Colors from "../../constants/Colors";

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const aspectRatio = width/height;
// 16x9 aspect ratio
const sbn = aspectRatio === 0.6020066889632107;

const ButtonAndroid = ({ onPress, title, style}) => {
  
  const textStyle = style ? style : styles.textStyle;

  return (
    <View
      style={styles.container}>
      <TouchableOpacity 
        style={styles.buttonContainer}
        onPress={onPress}
      >
        <Text style={textStyle}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default ButtonAndroid;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: '5%',
    // borderWidth: 1,
    // borderColor: 'white',
  },
  buttonContainer: {
    justifyContent: 'center',
    height: 0.06*height,
    overflow: 'hidden',
    paddingHorizontal: 35,
    borderRadius: 10,
    // borderWidth: 1,
    // borderColor: 'white', 
  },
  textStyle: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 18,
  }
});
