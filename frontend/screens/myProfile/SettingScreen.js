import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';

import styles from './styles';
import Colors from '../../constants/Colors';
import Input from '../../components/UI/Input';
import * as authActions from '../../store/actions/auth';

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

/* 
SettingScreen

 receive the data from the MyProfileScreen

 User can update
- name
- lastname

-- cambiar los botones dependiendo del sistema op.
*/

const SettingScreen = (props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  /*
  the user can logout but the internal memory will continue saving that he is already logged
  so next time he will se the auth screen, but it will not show the form to create a new user
  instead of, it will redirects back to the main screen (swipe)
   */
  const onSingUp = () => {
    firebase.auth().signOut();
    props.navigation.navigate('Auth');
  };

  /*
  if the user delete theit account, so it will delete the data from firebase and also 
  dispatch an action to clean the state maken authenticated null again
  next if he train to enter it will show again the screens to create another profile 
   */
  const onDelete = () => {
    setLoading(true);
    // delete from firebase
    firebase.auth().currentUser.delete();
    dispatch(authActions.logout());

    setLoading(false);
    props.navigation.navigate('Auth');
    // need to create a dispatch to delete from the db on postgres
  };

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.bg }}>
        <ActivityIndicator size="large" color={Colors.white} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.bg }}>
      <ScrollView contentContainerStyle={{ backgroundColor: Colors.bg }}>
        <View style={styles.settingContainer}>
          <View style={styles.inputContainer}>
            <Input
              labelStyle={styles.label} // style for the label
              inputStyle={styles.inputStyle}
              inputType="textInput"
              id="name"
              label="Name"
              keyboardType="default" // normal keyboard
              required
              autoCapitalize="sentences"
              errorText="Please enter your real name"
              initialValue="Damian"
              autoCorrect={false} // disable auto correction
              returnKeyType="next" // next button on keyboard instead of done
              onInputChange={() => {}}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              labelStyle={styles.label}
              inputStyle={styles.inputStyle}
              inputType="textInput"
              id="lastname"
              label="Lastname"
              keyboardType="default"
              required
              autoCapitalize="sentences"
              errorText="Please enter you real lastname"
              initialValue="Stone"
              autoCorrect={false} // disable auto correction
              returnKeyType="next" // next button on keyboard instead of done
              onInputChange={() => {}}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              labelStyle={styles.label}
              inputStyle={styles.inputStyle}
              inputType="textInput"
              id="university"
              label="University (optional)"
              keyboardType="default"
              autoCapitalize="sentences"
              required={false}
              initialIsValid={true}
              initialValue="University of Bristol"
              autoCorrect={false} // disable auto correction
              returnKeyType="next" // next button on keyboard instead of done
              onInputChange={() => {}}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              pickerRequired
              inputType="picker"
              labelStyle={styles.label}
              inputStyle={styles.inputStyle}
              items={gender}
              itemKey={show.value}
              label="Gender"
              initialValue="Man"
              id="gender"
              placeholder={{
                label: 'Select an item',
                value: 'Select an item',
              }}
              errorText="Please select your gender"
              onInputChange={() => {}}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              pickerRequired
              inputType="picker"
              labelStyle={styles.label}
              inputStyle={styles.inputStyle}
              items={show}
              itemKey={show.value}
              label="Show me"
              initialValue=""
              id="showme"
              placeholder={{
                label: 'Select an item',
                value: 'Select an item',
              }}
              errorText="Please select an option"
              onInputChange={() => {}}
            />
          </View>
          <View style={styles.inputContainer}>
            <Input
              labelStyle={styles.label}
              style={styles.textArea} // style for the
              underlineColorAndroid="transparent"
              placeholder="Type something"
              placeholderTextColor="grey"
              multiline={true}
              numberOfLines={5}
              maxLength={500}
              inputType="textInput"
              inputStyle={styles.textTareaStyle}
              id="about"
              label="About (optional)"
              autoCapitalize="none"
              required={false}
              initialIsValid={true}
              autoCorrect={false} // disable auto correction
              initialValue=""
              onInputChange={() => {}}
            />
          </View>
        </View>

        {/* INFORMATION */}

        <TouchableOpacity style={styles.optionView} onPress={() => {}}>
          <View style={styles.iconView}>
            <Text>ICON</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.textLabel}>Account details</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionView} onPress={() => {}}>
          <View style={styles.iconView}>
            <Text>ICON</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.textLabel}>Update account</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionView} onPress={onDelete}>
          <View style={styles.iconView}>
            <Text>ICON</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.textLabel}>DELETE ACCOUNT</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionView} onPress={() => {}}>
          <View style={styles.iconView}>
            <Text>ICON</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.textLabel}>Contact Us</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionView} onPress={() => {}}>
          <View style={styles.iconView}>
            <Text>ICON</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.textLabel}>Blocked users</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutView} onPress={onSingUp}>
          <Text style={styles.textLabel}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingScreen;
