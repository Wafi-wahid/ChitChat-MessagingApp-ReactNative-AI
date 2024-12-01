//screens/MessageScreen.js
import React from "react";
import { TextInput, Button, View, Text } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import globalStyles from "../styles/globalStyles";
import { sendMessageToFirebase } from "../services/firebaseService";

const MessageScreen = () => {
  const validationSchema = Yup.object({
    message: Yup.string()
      .required("Message is required")
      .min(1, "Message too short"),
  });

  return (
    <View style={globalStyles.container}>
      <Formik
        initialValues={{ message: "" }}
        onSubmit={(values, { resetForm }) => {
          sendMessageToFirebase(values.message);
          resetForm();
        }}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="Type a message"
              onChangeText={handleChange("message")}
              onBlur={handleBlur("message")}
              value={values.message}
            />
            {errors.message && (
              <Text style={globalStyles.errorText}>{errors.message}</Text>
            )}
            <Button title="Send" onPress={handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default MessageScreen;
