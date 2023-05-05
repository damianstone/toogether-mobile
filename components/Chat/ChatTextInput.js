import { StyleSheet, TextInput, TouchableOpacity, View, Image, ScrollView } from "react-native";
import { useEffect, useState, useRef } from "react";

import Colors from "../../constants/Colors";
import sendimg from '../../assets/images/send-button.png';

const ChatTextInput = (props) => {
  const { chatMessage, setChatMessage, handleSendMessage } = props;
  const scrollViewRef = useRef(null);

  const handleTextChange = (newText) => {
    setChatMessage(newText)
  };

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.inputContainer}
        // contentContainerStyle={{ flexGrow: 1 }}
        onContentSizeChange={scrollToBottom}
      >
        <TextInput
            inputMode="text,url"
            style={[styles.inputMessage]}
            placeholder="Type a message"
            placeholderTextColor={Colors.placeholder}
            onChangeText={(text) => handleTextChange(text)}
            value={chatMessage}
            autoCorrect={false}
            maxLength={1000}
            multiline
        />
      </ScrollView>
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
    flexDirection: 'row', 
    padding: 10,
  },

  inputContainer: {
    maxHeight: 150,
    paddingTop: 10,
  },

  inputMessage: {
    lineHeight: 20,
    backgroundColor: Colors.white,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
    borderRadius: 20,
    paddingBottom: 6,
    maxHeight: 130,
    textAlignVertical: 'bottom',
    alignSelf: 'center',
    fontSize: 16,
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
});