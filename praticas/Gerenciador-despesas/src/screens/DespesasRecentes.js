import { View, Text, StyleSheet } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';

export default function DespesasRecentes({ despesas }) {
  const despesasRecentes = [...despesas]
    .sort((a, b) => new Date(b.data) - new Date(a.data))
    .slice(0, 5);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Despesas Recentes</Text>

      <DespesaSaida
        despesas={despesasRecentes}
        periodo="Últimas despesas"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F1F5F9',
  },
  titulo: {
    marginBottom: 16,
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
  },
});