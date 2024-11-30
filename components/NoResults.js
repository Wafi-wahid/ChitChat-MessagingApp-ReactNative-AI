//components/NoResults.js
import React from "react";
import { Text, View, StyleSheet } from "react-native";

const NoResults = ({
  message = "No items found. Try a different search query.",
}) => (
  <View style={styles.container}>
    <Text style={styles.text}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#999",
  },
});

export default NoResults;
