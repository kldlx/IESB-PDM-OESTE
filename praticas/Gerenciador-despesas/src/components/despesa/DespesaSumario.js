import { View, Text, StyleSheet } from 'react-native';

export default function DespesaSumario({ despesas, periodo }) {
  const somaDespesas = despesas.reduce((total, despesa) => {
    return total + Number(despesa.valor);
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.periodo}>{periodo}</Text>

      <Text style={[
        styles.valor,
        somaDespesas > 200 && styles.valorAlto,
      ]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  periodo: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 4,
  },
  valor: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
  },
  valorAlto: {
    color: '#EF4444',
  },
});