import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import Colors from '../../constants/Colors';

const CustomPicker = (props) => {
  const { label, initialValue, onInputChange, items, itemKey } = props;

  return (
    <View style={styles.formControl}>
      <Text style={{ ...styles.label, ...props.labelStyle }}>{label}</Text>
      <View style={styles.scroll}>
        <RNPickerSelect
          {...props}
          placeholder={initialValue}
          onValueChange={onInputChange}
          items={items}
          itemKey={itemKey}
          onUpArrow={() => {
            console.log('up');
          }}
          onDownArrow={() => {
            console.log('down');
          }}
        />
      </View>
    </View>
  );
};

export default CustomPicker;

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
  },
  label: {
    marginVertical: 8,
    color: Colors.white,
    fontSize: 18,
  },
  scroll: {
    width: '100%',
    height: 33,
    backgroundColor: '#e2e2e2',
    borderRadius: 7,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.white,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 2,
    color: Colors.black,
    fontSize: 16,
    width: '100%',
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: Colors.orange,
    fontSize: 13,
  },
});
