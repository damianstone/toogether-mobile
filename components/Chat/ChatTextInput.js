import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';

import Colors from '../../constants/Colors';
import sendimg from '../../assets/images/send-button.png';

const ChatTextInput = ({ chatMessage, setChatMessage, handleSendMessage }) => {
  const [inputHeight, setInputHeight] = useState(0);

  const handleTextChange = (newText) => {
    setChatMessage(newText);
  };

  const handleContentSizeChange = (event) => {
    setInputHeight(event.nativeEvent.contentSize.height);
    const { height } = event.nativeEvent.contentSize;
    if (height > styles.inputMessage.height * 6) {
      setInputHeight(height);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputMessageContainer}>
        <TextInput
          inputMode="text,url"
          style={{
            ...styles.inputMessage,
            height: Math.min(Math.max(40, inputHeight), 200),
            maxHeight: 200,
          }}
          onChangeText={(text) => handleTextChange(text)}
          value={chatMessage}
          autoCorrect={false}
          maxLength={1000}
          onContentSizeChange={handleContentSizeChange}
          multiline
          keyboardType="default"
        />
      </View>

      <TouchableOpacity
        onPress={() => handleSendMessage()}
        style={styles.imgContainer}>
        <Image source={sendimg} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
};

export default ChatTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  inputMessageContainer: {
    width: '80%',
  },

  inputMessage: {
    width: '100%',
    lineHeight: 20,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    borderRadius: 20,
    fontSize: 15,
    textAlignVertical: 'vertical',
  },

  imgContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },

  image: {
    width: '100%',
    height: '100%',
  },
});
