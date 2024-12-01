//screens/ChatbotScreen.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

const ChatbotScreen = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return; // Prevent sending empty messages

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true); // Show loading indicator

    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: input }],
        },
        {
          headers: {
            Authorization: `Bearer YOUR_OPENAI_API_KEY`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiMessage = {
        text: response.data.choices[0].message.content,
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "Unable to fetch response. Please try again later.",
          sender: "ai",
        },
      ]);
      console.error("Error fetching AI response:", error);
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text
            style={
              item.sender === "user" ? styles.userMessage : styles.aiMessage
            }
          >
            {item.text}
          </Text>
        )}
      />
      {loading && <ActivityIndicator size="small" color="#007BFF" />}
      <TextInput
        style={styles.input}
        placeholder="Type your message..."
        value={input}
        onChangeText={setInput}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  aiMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5E5",
    color: "#000",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

export default ChatbotScreen;
