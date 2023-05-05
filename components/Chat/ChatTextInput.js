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
    paddingBottom: 10,
    paddingHorizontal: 6,
  },

  inputContainer: {
    maxHeight: 150,
    paddingTop: 10,
    marginBottom: 2,
  },

  inputMessage: {
    lineHeight: 20,
    backgroundColor: Colors.white,
    paddingLeft: 30,
    paddingRight: 30,
    width: '100%',
    borderRadius: 20,
    paddingTop: 8,
    paddingBottom: 8,
    maxHeight: 136,
    textAlignVertical: 'bottom',
    alignSelf: 'center',
    fontSize: 18,
  },

  imgContainer: {
    width: 44,
    height: 44,
    marginLeft: 15,
    marginBottom: 2,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },

  image: {
    width: '100%',
    height: '100%',
  },
});