//services/firebaseService.js
import { database } from "../firebase/firebaseConfig";
import { ref, set, push } from "firebase/database";
import { handleError } from "../firebase/utils/errorHandler";

export const sendMessageToFirebase = async (message) => {
  try {
    const messageRef = ref(database, "messages/");
    const newMessageRef = push(messageRef);
    await set(newMessageRef, { text: message });
  } catch (error) {
    handleError(error);
  }
};
