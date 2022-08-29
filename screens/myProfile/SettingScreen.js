import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';

import Input from '../../components/UI/Input';
import Colors from '../../constants/Colors';
import { logout } from '../../store/actions/user';
import styles from './styles';

// data to select from the form
const show = [
  {
    label: 'Hombres',
    value: 'hombres',
  },
  {
    label: 'Mujeres',
    value: 'mujeres',
  },
  {
    label: 'Mixto',
    value: 'Mixto',
  },
];

const gender = [
  {
    label: 'Masculino',
    value: 'Masculino',
  },
  {
    label: 'Femenino',
    value: 'Femenino',
  },
  {
    label: 'otro',
    value: 'otro',
  },
];

const SettingScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const onLogOut = () => {
    dispatch(logout());
    props.navigation.navigate('AuthStart');
  };

  const onDelete = () => {};

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.bg }}>
        <ActivityIndicator color={Colors.white} size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg }}>
      <ScrollView contentContainerStyle={{ backgroundColor: Colors.bg }}>
        <View style={styles.settingContainer}>
          <View style={styles.inputContainer}>
            <Input
              autoCapitalize="sentences"
              autoCorrect={false} // disable auto correction
              errorText="Please enter your real name"
              id="name"
              initialValue="Damian"
              inputStyle={styles.inputStyle}
              inputType="textInput"
              keyboardType="default" // normal keyboard
              label="Name"
              labelStyle={styles.label} // style for the label
              onInputChange={() => {}}
              required
              returnKeyType="next" // next button on keyboard instead of done
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              autoCapitalize="sentences"
              autoCorrect={false} // disable auto correction
              errorText="Please enter you real lastname"
              id="lastname"
              initialValue="Stone"
              inputStyle={styles.inputStyle}
              inputType="textInput"
              keyboardType="default"
              label="Lastname"
              labelStyle={styles.label}
              onInputChange={() => {}}
              required
              returnKeyType="next" // next button on keyboard instead of done
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              autoCapitalize="sentences"
              autoCorrect={false} // disable auto correction
              id="university"
              initialIsValid
              initialValue="University of Bristol"
              inputStyle={styles.inputStyle}
              inputType="textInput"
              keyboardType="default"
              label="University (optional)"
              labelStyle={styles.label}
              onInputChange={() => {}}
              required={false}
              returnKeyType="next" // next button on keyboard instead of done
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              errorText="Please select your gender"
              id="gender"
              initialValue="Man"
              inputStyle={styles.inputStyle}
              inputType="picker"
              itemKey={show.value}
              items={gender}
              label="Gender"
              labelStyle={styles.label}
              onInputChange={() => {}}
              pickerRequired
              placeholder={{
                label: 'Select an item',
                value: 'Select an item',
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              errorText="Please select an option"
              id="showme"
              initialValue=""
              inputStyle={styles.inputStyle}
              inputType="picker"
              itemKey={show.value}
              items={show}
              label="Show me"
              labelStyle={styles.label}
              onInputChange={() => {}}
              pickerRequired
              placeholder={{
                label: 'Select an item',
                value: 'Select an item',
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              autoCapitalize="none"
              autoCorrect={false} // disable auto correction
              id="about"
              initialIsValid
              initialValue=""
              inputStyle={styles.textTareaStyle}
              inputType="textInput"
              label="About (optional)"
              labelStyle={styles.label}
              maxLength={500}
              multiline
              numberOfLines={5}
              onInputChange={() => {}}
              placeholder="Type something"
              placeholderTextColor="grey"
              required={false}
              style={styles.textArea} // style for the
              underlineColorAndroid="transparent"
            />
          </View>
        </View>

        {/* INFORMATION */}

        <TouchableOpacity onPress={() => {}} style={styles.optionView}>
          <View style={styles.iconView}>
            <Text>ICON</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.textLabel}>Account details</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.optionView}>
          <View style={styles.iconView}>
            <Text>ICON</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.textLabel}>Update account</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.optionView}>
          <View style={styles.iconView}>
            <Text>ICON</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.textLabel}>DELETE ACCOUNT</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.optionView}>
          <View style={styles.iconView}>
            <Text>ICON</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.textLabel}>Contact Us</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.optionView}>
          <View style={styles.iconView}>
            <Text>ICON</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.textLabel}>Blocked users</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onLogOut} style={styles.logoutView}>
          <Text style={styles.textLabel}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingScreen;
