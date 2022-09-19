import React, { useReducer, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import RNPickerSelect from 'react-native-picker-select';

import Colors from '../../constants/Colors';

const CHANGE = 'CHANGE';
const BLUR = 'BLUR';

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
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initialIsValid,
    touched: false,
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      // here the state of editProduct is assigned to the state of input component
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

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
        initialValue="YYYY-MM-DD"
        style={styles.input}
        type="datetime"
        options={{
          format: 'YYYY-MM-DD',
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
      {props.serverError ? (
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
    width: '100%',
    height: 45,
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
    width: '90%',
  },
  errorText: {
    marginHorizontal: 5,
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
});
