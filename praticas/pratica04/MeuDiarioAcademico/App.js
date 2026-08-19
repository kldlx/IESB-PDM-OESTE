import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Switch,
} from 'react-native';

import {
  SafeAreaView,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import {
  APP_TITLE,
  INPUT_PLACEHOLDER,
  ADD_BUTTON,
  LIST_TITLE,
} from './labels';

const disciplinas = [
  'Programação para Dispositivos Móveis',
  'Banco de Dados',
  'Engenharia de Software',
  'Análise e Desenvolvimento de Sistemas',
];

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>

          {/* Cabeçalho */}
          <Text style={styles.title}>
            {APP_TITLE}
          </Text>

          {/* Área de cadastro */}
          <View style={styles.inputRow}>

            <TextInput
              style={styles.input}
              placeholder={INPUT_PLACEHOLDER}
            />

            <Pressable
              style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
>
              <Text style={styles.buttonText}>
                {ADD_BUTTON}
              </Text>
            </Pressable>

          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchText}>
               Mostrar apenas obrigatórias
            </Text>

            <Switch />
          </View>

          {/* Título da lista */}
          <Text style={styles.listTitle}>
            {LIST_TITLE}
          </Text>

          {/* Lista estática de disciplinas */}
          <View>
            {disciplinas.map((disciplina) => (
              <View
                style={styles.item}
                key={disciplina}
              >
                <Text style={styles.itemText}>
                  {disciplina}
                </Text>
              </View>
            ))}
          </View>

        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 25,
  },

  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },

  input: {
    width: '75%',
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 8,
    padding: 12,
  },

  button: {
    flex: 1,
    marginLeft: 10,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontWeight: 'bold',
  },

  buttonPressed: {
  opacity: 0.6,
},

  listTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  item: {
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },

  itemText: {
    fontSize: 16,
  },

  switchRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 20,
},

switchText: {
  fontSize: 16,
},
});