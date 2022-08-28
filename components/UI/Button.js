import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../../constants/Colors';

const Button = (props) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <View style={styles.buttonContainerNoValid}>
        <Button
          onPress={props.onPress}
          color={props.color}
          title={props.title}
        />
      </View>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
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
});
