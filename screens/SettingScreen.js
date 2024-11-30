// screens/SettingsScreen.js

import React from "react";
import { View, Button } from "react-native";
import { auth } from "./firebase";
import { signOut } from "firebase/auth";

const SettingsScreen = ({ navigation }) => {
  const handleLogout = async () => {
    await signOut(auth);
    navigation.navigate("Login");
  };

  return (
    <View>
      <Button title="Logout" onPress={handleLogout} />
      <Button
        title="Back to Home"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
};

export default SettingsScreen;
