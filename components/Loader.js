//components/Loader.js
import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

const Loader = () => (
  <View style={styles.loaderContainer}>
    <ActivityIndicator size="large" color="#007BFF" />
  </View>
);

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Loader;
