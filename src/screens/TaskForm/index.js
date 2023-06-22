import React from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";

const validationSchema = yup.object().shape({
  title: yup.string().required("O título é obrigatório."),
});

const TaskForm = ({ navigation }) => {
  const handleFormSubmit = (values, { resetForm }) => {
    axios
      .post("http://localhost:3000/tasks", values)
      .then(() => {
        console.log("Tarefa cadastrada com sucesso!");
        navigation.navigate("Lista de tarefas");
      })
      .catch((error) => console.error(error));
  };

  return (
    <Formik
      initialValues={{ title: "" }}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={handleChange("title")}
            value={values.title}
            placeholder="Título da tarefa"
          />
          {errors.title && <Text style={styles.error}>{errors.title}</Text>}
          <Button onPress={handleSubmit} title="Cadastrar" />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default TaskForm;
