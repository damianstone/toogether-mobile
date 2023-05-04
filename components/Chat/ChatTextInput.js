import { StyleSheet, TextInput, TouchableOpacity, View, Image } from "react-native";
import { useState } from "react";

import Colors from "../../constants/Colors";
import sendimg from '../../assets/images/send-button.png';

const ChatTextInput = (props) => {
  const { chatMessage, setChatMessage, handleSendMessage } = props;

  const [inputHeight, setInputHeight] = useState(40);
  const [inputRadius, setInputRadius] = useState(0);
  const [transformStyle, setTransformStyle] = useState(1);
  const [bottomMargin, setBottomMargin] = useState(0);

  const handleTextChange = (newText) => {
    const lines = newText.split('\n').length;
    const newInputHeight = 40 + (lines-1) * 20;
    const newTransformStyle = 1 + (lines-1) * 0.1;
    // const newBottomMargin = (lines-1) * 7;
    if (newInputHeight <= 120) {
      setTransformStyle(newTransformStyle);
      setInputHeight(newInputHeight);
      // setBottomMargin(newBottomMargin);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
          inputMode="text,url"
          style={[styles.inputMessage, {height: inputHeight, marginBottom: bottomMargin, transform: [{scaleY: transformStyle}]}]}
          placeholder="Type a message"
          placeholderTextColor={Colors.placeholder}
          onChangeText={(text) => {
            setChatMessage(text);
            handleTextChange(text);
          }}
          value={chatMessage}
          autoCorrect={false}
          maxLength={1000}
          multiline
      />
      <TouchableOpacity
        onPress={() => handleSendMessage()}
        style={styles.imgContainer}>
        <Image source={sendimg} style={styles.image} />
      </TouchableOpacity>
    </View>
  );
} 

export default ChatTextInput;

const styles = StyleSheet.create({
  container: {
    borderColor: 'white',
    borderWidth: 1,
    flexDirection: 'row', 
    padding: 10,
  },

  inputMessage: {
    lineHeight: 20,
    backgroundColor: Colors.white,
    marginTop: 2.5,
    paddingLeft: 22,
    width: '85%',
    borderRadius: 30,
    // textAlignVertical: 'top',
  },

  imgContainer: {
    backgroundColor: Colors.orange,
    borderRadius: 50,
    width: 40,
    height: 40,
    marginLeft: 15,
    marginBottom: 5,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },

  image: {
    width: '100%',
    height: '100%',
  },
})