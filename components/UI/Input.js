import React, { useReducer, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import RNPickerSelect from 'react-native-picker-select';

import Colors from '../../constants/Colors';

const CHANGE = 'CHANGE';
const BLUR = 'BLUR';

// change the internal state of input that is the same as change the edit product input with props
const inputReducer = (state, action) => {
  switch (action.type) {
    case CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
        touched: true,
      };
    case BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  // internal state of input component that is the same as editProduct state passed in as props
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initialIsValid,
    touched: false, // to check if the input has been touched
  });

  // there the state from editProduct is passed to the input component
  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      // here the state of editProduct is assigned to the state of input component
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  // handle when the user change the values of inputs
  const textChangeHandler = (text) => {
    // some rules to use as a props
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    if (props.pickerRequired && text === props.placeholder.value) {
      isValid = false;
    }

    // dispatch to the input state
    dispatch({
      type: CHANGE,
      value: text,
      isValid: isValid,
    });
  };

  const lostFocusHandler = () => {
    dispatch({
      type: BLUR,
    });
  };

  let InputType;
  // NORMAL TEXT INPUT
  if (props.inputType === 'textInput') {
    InputType = (
      <TextInput
        {...props}
        style={{ ...styles.input, ...props.style }}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
    );
  }

  // TEXT INPUT MASK
  if (props.inputType === 'inputMask') {
    InputType = (
      <TextInputMask
        {...props}
        initialValue="DD-MM-YYYY"
        style={styles.input}
        type={'datetime'}
        options={{
          format: 'DD-MM-YYYY',
        }}
        onChangeText={textChangeHandler}
        value={inputState.value}
        onBlur={lostFocusHandler}
      />
    );
  }

  // TOGGLE PICKER
  if (props.inputType === 'picker') {
    InputType = (
      <RNPickerSelect
        {...props}
        placeholder={props.placeholder}
        value={inputState.value}
        items={props.items}
        style={{
          ...pickerStyles,
          iconContainer: {
            top: 10,
            right: 12,
          },
        }}
        itemKey={props.itemKey}
        onUpArrow={() => {
          console.log('up');
        }}
        onDownArrow={() => {
          console.log('down');
        }}
        onBlur={lostFocusHandler}
        onValueChange={textChangeHandler}
      />
    );
  }

  return (
    <View style={styles.formControl}>
      <Text style={{ ...styles.label, ...props.labelStyle }}>
        {props.label}
      </Text>
      <View style={{ ...styles.inputContainer, ...props.inputStyle }}>
        {InputType}
      </View>
      {!inputState.isValid && inputState.touched ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
  },
  label: {
    marginVertical: 8,
  },
  inputContainer: {
    width: '90%',
    height: 33,
    paddingHorizontal: 10,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 2,
    color: Colors.white,
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

const pickerStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    color: Colors.white,
  },
  inputAndroid: {
    fontSize: 16,
    color: Colors.white,
  },
})
