//screens/HomeScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { database } from "../firebase/firebaseConfig";
import { ref, onValue } from "firebase/database";

const HomeScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true); // For loading state
  const [errorMessage, setErrorMessage] = useState(""); // For error or empty state messages

  useEffect(() => {
    const messagesRef = ref(database, "messages/");

    const unsubscribe = onValue(
      messagesRef,
      (snapshot) => {
        const data = snapshot.val();

        if (!data) {
          setErrorMessage("No messages found."); // Database is empty
          setMessages([]);
        } else {
          const messagesList = Object.values(data).filter(
            (message) => message && typeof message.text === "string" // Validate data
          );

          if (messagesList.length === 0) {
            setErrorMessage("No valid messages available."); // Data is invalid
          } else {
            setErrorMessage("");
            setMessages(messagesList);
          }
        }
        setLoading(false); // Stop loading
      },
      (error) => {
        setErrorMessage("Error fetching data. Please try again later."); // Error handling
        setLoading(false);
      }
    );

    return () => unsubscribe(); // Clean up listener
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Text style={styles.message}>{item.text}</Text>
          )}
        />
      )}
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate("Profile")}
      />
      <Button
        title="Send Message"
        onPress={() => navigation.navigate("Messages")}
      />
      <Button
        title="Search Items"
        onPress={() => navigation.navigate("Search")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  message: {
    fontSize: 16,
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#E5E5E5",
    borderRadius: 5,
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginVertical: 20,
  },
});

export default HomeScreen;
