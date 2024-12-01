//screens/ProfileScreen.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { database, auth } from "../firebase/firebaseConfig";
import { ref, update } from "firebase/database";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");

  // Function to validate input
  const validateInput = () => {
    // Validate name
    const nameRegex = /^[a-zA-Z ]{2,30}$/; // Only letters and spaces, 2–30 characters
    if (!nameRegex.test(name)) {
      setError(
        "Name must be 2–30 characters long and contain no special characters."
      );
      return false;
    }
    return true;
  };

  const updateProfile = async () => {
    if (!validateInput()) return; // Check for validation errors

    try {
      const userRef = ref(database, `users/${auth.currentUser.uid}`);
      await update(userRef, { name, bio });
      setError(""); // Clear any previous errors
      // Show success toast notification
      ToastAndroid.show("Profile updated successfully!", ToastAndroid.SHORT);
    } catch (error) {
      setError("Failed to update profile. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Bio"
        value={bio}
        onChangeText={setBio}
        multiline
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Update Profile" onPress={updateProfile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  error: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
});

export default ProfileScreen;
