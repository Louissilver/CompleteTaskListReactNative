import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import TaskList from "./src/TaskList";
import TaskForm from "./src/TaskForm";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Lista de tarefas" component={TaskList} />
        <Stack.Screen name="Cadastro de tarefas" component={TaskForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
