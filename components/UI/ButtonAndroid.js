import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../constants/Colors';
import Device from '../../theme/Device';

const ButtonAndroid = ({ onPress, title, style }) => {
  const textStyle = style ? style : styles.textStyle;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <Text style={textStyle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonAndroid;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonContainer: {
    justifyContent: 'center',
    height: 0.06 * Device.height,
    overflow: 'hidden',
    paddingHorizontal: 35,
    borderRadius: 10,
  },
  textStyle: {
    textAlign: 'center',
    color: Colors.white,
    fontSize: 18,
  },
});
