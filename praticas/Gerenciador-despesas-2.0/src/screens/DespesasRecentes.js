
import { useMemo } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { Colors } from '../constants/theme';
import { useExpenses } from '../store/expenses-context';
import DespesaLista from '../components/despesa/DespesaLista';
import DespesaSumario from '../components/despesa/DespesaSumario';

export default function DespesasRecentes({ navigation }) {
  const { expenses } = useExpenses();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  const recentExpenses = useMemo(() => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setHours(0, 0, 0, 0);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    return expenses
      .filter((expense) => {
        if (!expense.date) {
          return false;
        }

        const expenseDate = new Date(`${expense.date}T12:00:00`);

        return expenseDate >= sevenDaysAgo && expenseDate <= today;
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [expenses]);

  function handleSelectExpense(expenseId) {
    navigation.navigate('GerenciarDespesa', { expenseId });
  }

  const header = (
    <View>
      <View style={styles.heading}>
        <Text style={[styles.title, { color: theme.text }]}>
          Despesas recentes
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Seus gastos dos últimos sete dias.
        </Text>
      </View>

      <DespesaSumario expenses={recentExpenses} />

      <View style={styles.listHeading}>
        <Text style={[styles.listTitle, { color: theme.text }]}>
          Últimos lançamentos
        </Text>

        <Pressable
          onPress={() => navigation.navigate('TodasDespesas')}
          accessibilityRole="button"
        >
          <Text style={[styles.link, { color: theme.primary }]}>
            Ver todas
          </Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <DespesaLista
        expenses={recentExpenses}
        onSelectExpense={handleSelectExpense}
        ListHeaderComponent={header}
        emptyTitle="Nenhuma despesa recente"
        emptyMessage="As despesas cadastradas nos últimos sete dias aparecerão aqui."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    paddingHorizontal: 16,
    paddingTop: 22,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 13,
    marginTop: 6,
    lineHeight: 19,
  },
  listHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 18,
    marginBottom: 8,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  link: {
    fontSize: 13,
    fontWeight: '600',
  },
});
