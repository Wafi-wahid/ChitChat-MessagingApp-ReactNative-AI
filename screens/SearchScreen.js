// screens/SearchScreen.js

import React, { useState, useEffect } from "react";
import { TextInput, FlatList, Text, View } from "react-native";
import { database } from "./firebase";
import { ref, onValue } from "firebase/database";

const SearchScreen = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);

  useEffect(() => {
    const messagesRef = ref(database, "messages/");
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const messagesList = data ? Object.values(data) : [];
      setMessages(messagesList);
    });
  }, []);

  useEffect(() => {
    setFilteredMessages(
      messages.filter((msg) =>
        msg.text.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, messages]);

  return (
    <View>
      <TextInput
        placeholder="Search messages"
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={filteredMessages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item.text}</Text>}
      />
    </View>
  );
};

export default SearchScreen;
