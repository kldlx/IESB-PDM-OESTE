import { useState } from 'react';

import {View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';

export default function App() {
  const [taskText, setTaskText] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleAdd = () => {
    if (taskText.trim() === '') {
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      title: taskText,
    };

    setTasks([...tasks, newTask]);
    setTaskText('');
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

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

        {tasks.map((item) => (
          <View style={styles.card} key={item.id}>

            <Text style={styles.task}>
              {item.title}
            </Text>

            <TouchableOpacity
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.delete}>X</Text>
            </TouchableOpacity>

          </View>
        ))}

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
    marginTop: 10,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },

  task: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },

  delete: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});