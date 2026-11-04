import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useExpenses } from '../../store/expenses-context';

export default function WalletScreen() {
  const { expenses, isLoaded } = useExpenses();

  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0
  );

  async function shareTotal() {
    try {
      await Share.share({
        message: `Meu resumo financeiro no CampusGo:\n\nTotal de despesas: R$ ${total.toFixed(2).replace('.', ',')}\nQuantidade de despesas: ${expenses.length}`,
      });
    } catch (error) {
      console.error('Erro ao compartilhar despesas:', error);
    }
  }

  if (!isLoaded) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2563EB" />
        <Text style={styles.loadingText}>Carregando despesas...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Meu bolso</Text>
      <Text style={styles.subtitle}>
        Acompanhe suas despesas cadastradas.
      </Text>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total de despesas</Text>
        <Text style={styles.totalValue}>
          R$ {total.toFixed(2).replace('.', ',')}
        </Text>
        <Text style={styles.countText}>
          {expenses.length} {expenses.length === 1 ? 'despesa registrada' : 'despesas registradas'}
        </Text>
      </View>

      <Pressable
        style={styles.shareButton}
        onPress={shareTotal}
      >
        <Text style={styles.shareButtonText}>Compartilhar resumo</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>Despesas recentes</Text>

      {expenses.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>Nenhuma despesa encontrada</Text>
          <Text style={styles.emptyText}>
            Suas despesas cadastradas aparecerão aqui.
          </Text>
        </View>
      ) : (
        expenses.slice(0, 5).map((expense) => (
          <View key={expense.id} style={styles.expenseCard}>
            <View style={styles.expenseInfo}>
              <Text style={styles.expenseTitle}>
                {expense.title || expense.description || 'Despesa'}
              </Text>
              <Text style={styles.expenseDate}>
                {expense.date || 'Data não informada'}
              </Text>
            </View>

            <Text style={styles.expenseAmount}>
              R$ {Number(expense.amount || 0).toFixed(2).replace('.', ',')}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 20,
    paddingBottom: 35,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    gap: 12,
  },
  loadingText: {
    color: '#64748B',
    fontSize: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0F172A',
  },
  subtitle: {
    fontSize: 15,
    color: '#64748B',
    marginTop: 5,
    marginBottom: 24,
  },
  totalCard: {
    backgroundColor: '#2563EB',
    borderRadius: 18,
    padding: 24,
    marginBottom: 16,
  },
  totalLabel: {
    color: '#DBEAFE',
    fontSize: 15,
  },
  totalValue: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: 'bold',
    marginTop: 10,
  },
  countText: {
    color: '#DBEAFE',
    fontSize: 14,
    marginTop: 8,
  },
  shareButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#2563EB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 28,
  },
  shareButtonText: {
    color: '#2563EB',
    fontWeight: 'bold',
    fontSize: 15,
  },
  sectionTitle: {
    color: '#0F172A',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 22,
    alignItems: 'center',
  },
  emptyTitle: {
    color: '#334155',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#64748B',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 7,
  },
  expenseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  expenseInfo: {
    flex: 1,
    marginRight: 12,
  },
  expenseTitle: {
    color: '#0F172A',
    fontSize: 15,
    fontWeight: '600',
  },
  expenseDate: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 5,
  },
  expenseAmount: {
    color: '#DC2626',
    fontSize: 15,
    fontWeight: 'bold',
  },
});