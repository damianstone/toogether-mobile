import React, { useReducer, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

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

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={inputState.value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
      />
      {!inputState.isValid && inputState.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.errorText}</Text>
        </View>
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: 'open-sans',
    color: 'red',
    fontSize: 13,
  },
});
