import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        Minhas Tarefas
      </Text>

      <View style={styles.inputArea}>

        <TextInput
          style={styles.input}
          placeholder="Digite uma tarefa..."
        />

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.list}>

        <View style={styles.card}>
          <Text style={styles.task}>
            Estudar os componentes básicos do React Native
          </Text>

          <TouchableOpacity>
            <Text style={styles.delete}>X</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.task}>
            Fazer a atividade da Prática 03 e aprender mais sobre Flexbox
          </Text>

          <TouchableOpacity>
            <Text style={styles.delete}>X</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.task}>
            Revisar o conteúdo da aula antes de começar a próxima prática
          </Text>

          <TouchableOpacity>
            <Text style={styles.delete}>X</Text>
          </TouchableOpacity>
        </View>

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