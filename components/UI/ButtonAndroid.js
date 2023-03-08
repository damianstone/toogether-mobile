import { StyleSheet, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import Colors from "../../constants/Colors";

const ButtonAndroid = ({ onPress, title, style}) => {
  
  const textStyle = style ? style : styles.textStyle;

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={onPress}
    >
      <Text style={textStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default ButtonAndroid;

const styles = StyleSheet.create({
  container: {
    // flex: 1, //flex seems to break TouchableOpacity
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    height: 30,
    paddingHorizontal: 35, 
    
  },
  textStyle: {
    color: Colors.white,
    fontSize: 18,
  }
});
