//screens/ForgetPasswordScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    setMessage(""); // Clear previous messages
    setLoading(true); // Disable button while processing

    try {
      if (!email) {
        setMessage("Please enter an email address.");
        return;
      }

      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Please check your inbox.");
      setEmail("");
    } catch (error) {
      // Customizing error messages based on Firebase error codes
      switch (error.code) {
        case "auth/invalid-email":
          setMessage("Invalid email format. Please enter a valid email.");
          break;
        case "auth/user-not-found":
          setMessage(
            "No account found with this email. Please check and try again."
          );
          break;
        default:
          setMessage("Something went wrong. Please try again later.");
          break;
      }
    } finally {
      setLoading(false); // Re-enable button
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {loading ? (
        <ActivityIndicator size="small" color="#007BFF" />
      ) : (
        <Button
          title="Reset Password"
          onPress={handlePasswordReset}
          disabled={loading}
        />
      )}
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <Button
        title="Back to Login"
        onPress={() => navigation.navigate("Login")}
        color="#6c757d"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  message: {
    marginTop: 10,
    textAlign: "center",
    color: "red",
  },
});

export default ForgotPasswordScreen;
