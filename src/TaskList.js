import React, { useCallback, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const TaskList = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = useCallback(() => {
    axios
      .get("http://localhost:3000/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error(error));
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [fetchTasks])
  );

  const handleDeleteTask = (taskId) => {
    axios
      .delete("http://localhost:3000/tasks/" + taskId)
      .then((response) => fetchTasks())
      .catch((error) => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tarefas</Text>
      {tasks.map((task) => (
        <View key={task.id} style={styles.taskContainer}>
          <Text style={styles.taskText}>{task.title}</Text>
          <View style={styles.buttonsContainer}>
            <Button
              color="red"
              margin={5}
              title="Excluir"
              onPress={() => handleDeleteTask(task.id)}
            />
          </View>
        </View>
      ))}
      <Button
        title="Adicionar tarefa"
        onPress={() => {
          navigation.navigate("Cadastro de tarefas");
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "100%",
  },
  taskText: {
    flex: 1,
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  deleteButton: {
    marginLeft: 10,
    backgroundColor: "red",
  },
});

export default TaskList;
