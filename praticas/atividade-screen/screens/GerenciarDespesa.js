import { View, Text, StyleSheet } from 'react-native';

export default function GerenciarDespesa() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Despesa</Text>
      <Text style={styles.subtitle}>Adicione ou edite uma despesa</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0F172A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
  },
});
