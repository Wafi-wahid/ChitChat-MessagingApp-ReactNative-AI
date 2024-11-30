//styles/globalStyles.css
import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  suggestion: {
    padding: 10,
    fontSize: 14,
    color: "#007BFF",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default globalStyles;
