import { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

import { TaskCard } from './src/components/TaskCard';

export default function App() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);

  const saveTasks = async (tasksToSave) => {
    try {
      await AsyncStorage.setItem(
        'tasks',
        JSON.stringify(tasksToSave)
      );
    } catch (error) {
      console.log('Erro ao salvar tarefas:', error);
    }
  };

  const handleAdd = async () => {
    if (taskText.trim() === '') {
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: taskText,
    };

    const updatedTasks = [...tasks, newTask];

    setTasks(updatedTasks);
    await saveTasks(updatedTasks);

    setTaskText('');
  };

  const handleDelete = async (id) => {
    const updatedTasks = tasks.filter(
      (task) => task.id !== id
    );

    setTasks(updatedTasks);
    await saveTasks(updatedTasks);
  };

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');

      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.log('Erro ao carregar tarefas:', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Minhas Tarefas
      </Text>

      <View style={styles.inputArea}>

        <TextInput
          style={styles.input}
          placeholder="Digite uma tarefa..."
          value={taskText}
          onChangeText={setTaskText}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAdd}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.list}>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TaskCard
              title={item.title}
              onDelete={() => handleDelete(item.id)}
            />
          )}
        />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  inputArea: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
  },

  addButton: {
    marginLeft: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#ddd',
  },

  addButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  list: {
    flex: 1,
    marginTop: 10,
  },
});