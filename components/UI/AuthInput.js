import React, { useReducer, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Platform } from 'react-native';

import Colors from '../../constants/Colors';
import Device from '../../theme/Device';

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

const AuthInput = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue ? props.initialValue : '',
    isValid: props.initialIsValid,
    touched: false,
  });

  const { onInputChange, id } = props;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [inputState, onInputChange, id]);

  const textChangeHandler = (text) => {
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
      <View style={styles.container}>
        <Text style={{ ...styles.label, ...props.labelStyle }}>
          {props.label}
        </Text>
        <View style={{ ...styles.inputContainer, ...props.inputStyle }}>
          <TextInput
            {...props}
            style={{ ...styles.input, ...props.style }}
            value={inputState.value}
            onChangeText={textChangeHandler}
            onBlur={lostFocusHandler}
          />
        </View>
        {!inputState.isValid && inputState.touched ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{props.errorText}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default AuthInput;

const styles = StyleSheet.create({
  formControl: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  label: {
    color: Colors.black,
    fontSize: 20,
    marginVertical: Platform.OS === 'ios' ? 10 : 0.001 * Device.height,
    alignSelf: 'flex-start',
  },

  inputContainer: {
    padding: 5,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D8D8D8',
    justifyContent: 'center',
    width: '100%',
    height: 45,
    paddingHorizontal: 10,
  },

  input: {
    paddingHorizontal: 2,
    paddingVertical: 2,
    color: Colors.blackwqs,
    fontSize: 16,
    width: '100%',
  },

  errorContainer: {
    marginVertical: 5,
    alignSelf: 'flex-start',
  },

  errorText: {
    color: Colors.orange,
    fontSize: 13,
  },
});
