//services/firebaseService.js
import { database } from "./firebase";
import { ref, set, push } from "firebase/database";
import { handleError } from "../utils/errorHandler";

export const sendMessageToFirebase = async (message) => {
  try {
    const messageRef = ref(database, "messages/");
    const newMessageRef = push(messageRef);
    await set(newMessageRef, { text: message });
  } catch (error) {
    handleError(error);
  }
};
