import { StyleSheet, Text, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import Colors from "../../constants/Colors";

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
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
    marginBottom: 10,
    // borderWidth: 1,
    // borderColor: 'white',
  },
  buttonContainer: {
    // flex: 1,
    justifyContent: 'center',
    height: 30,
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
