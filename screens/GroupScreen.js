import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import Colors from '../constants/Colors';

const Group = () => {
  const [showLink, setShowLink] = useState(false);
  const withGroup = null;
  const startGroup = null;

  const onCreateGroup = () => {
    setShowLink(true);
    console.log('add backend login');
  };

  const onDeleteGroup = () => {
    alert('sure u wanna delete the group');
  };

  const onGoToGroupChat = () => {
    console.log('go to group chat');
  };

  let card;

  if (showLink) {
    card = (
      <View style={styles.bigCard}>
        <Text style={styles.cardTitle}>You've created a group</Text>
        <Text style={styles.smallText}>
          Copy the following code and send it to your friends so they can join
          your group.
        </Text>
        <View style={styles.linkContainer}>
          <Text style={styles.linkText}>
            https://meet.google.com/xco-vjay-dyq
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={onDeleteGroup} style={styles.buttonDelete}>
            <Text style={styles.buttonText}>Delete Group</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onGoToGroupChat} style={styles.buttonChat}>
            <Text style={styles.buttonText}>Chat Group</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    card = (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Start a group</Text>
        <TouchableOpacity
          onPress={onCreateGroup}
          style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Create</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      {card}
      <View style={styles.howContainer}>
        <Text style={styles.howTitlee}>Como functiona</Text>
        <Text style={styles.howText}>
          En Toogether puedes crear perfiles grupales, de esta forma te puedes
          mostrar a las demas personas como un grupo
        </Text>
        <Text style={styles.howText}>
          1️⃣ Genera tu propio link y compartelo el link con tus amigos para que
          puedan unirse a tu grupo
        </Text>
        <Text style={styles.howText}>
          2️⃣ Se creara un chat grupal automatico con los integrantes que se unan
        </Text>
        <Text style={styles.howText}>
          3️⃣ En el chat pueden compartir sus matchs y plenear su gran noche
        </Text>
        <Text style={styles.howText}>
          🍻 Todos los participantes puedes swipear y conectar con otros grupos
        </Text>
        <Text style={styles.howText}>
          🔥 Tus matchs, son tus matchs. Nadie mas podra verlos
        </Text>
      </View>
    </View>
  );
};

export default Group;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  card: {
    width: '90%',
    height: '30%',
    backgroundColor: Colors.bgCard,
    borderRadius: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
  },
  cardTitle: {
    fontSize: 20,
    color: Colors.white,
  },
  buttonContainer: {
    backgroundColor: Colors.green,
    width: 100,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    color: Colors.white,
  },
  linkContainer: {
    backgroundColor: Colors.white,
    width: 300,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText: {
    color: Colors.black,
  },
  bigCard: {
    width: '90%',
    height: '40%',
    backgroundColor: Colors.bgCard,
    borderRadius: 30,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
  },
  smallText: {
    color: Colors.white,
    fontSize: 12,
  },
  buttonsContainer: {
    marginVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    width: '100%',
  },
  buttonDelete: {
    padding: 5,
    backgroundColor: Colors.red,
    width: 110,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonChat: {
    padding: 5,
    backgroundColor: Colors.green,
    width: 110,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  howContainer: {
    flexDirection: 'column',
    padding: 20,
  },
  howTitlee: {
    marginVertical: 7,
    color: Colors.white,
    fontSize: 20,
  },
  howText: {
    marginVertical: 7,
    color: Colors.white,
    fontSize: 15,
  },
});
