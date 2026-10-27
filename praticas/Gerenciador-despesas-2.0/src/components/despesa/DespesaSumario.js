
import { StyleSheet, Text, View } from 'react-native';

export default function DespesaSumario({ expenses = [] }) {
  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0
  );

  function formatCurrency(value) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.label}>Despesas</Text>
        <Text style={styles.quantity}>{expenses.length}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.label}>Total</Text>
        <Text style={styles.total}>{formatCurrency(total)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    marginHorizontal: 0,
    marginVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderLeftWidth: 4,
    borderLeftColor: '#2563EB',
    backgroundColor: '#FFFFFF',
  },
  info: {
    gap: 5,
  },
  label: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '500',
  },
  quantity: {
    color: '#1E293B',
    fontSize: 22,
    fontWeight: '700',
  },
  total: {
    color: '#2563EB',
    fontSize: 20,
    fontWeight: '700',
  },
});
