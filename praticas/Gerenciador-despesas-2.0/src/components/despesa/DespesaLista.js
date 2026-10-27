
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Colors } from '../../constants/theme';
import DespesaItem from './DespesaItem';

const theme = Colors.light;

export default function DespesaLista({
  expenses,
  onSelectExpense,
  ListHeaderComponent,
  emptyTitle = 'Nenhuma despesa encontrada',
  emptyMessage = 'Adicione uma despesa para começar a acompanhar seus gastos.',
}) {
  function renderExpenseItem({ item }) {
    return (
      <DespesaItem
        expense={item}
        onPress={() => onSelectExpense(item.id)}
      />
    );
  }

  function renderEmptyList() {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🧾</Text>
        <Text style={styles.emptyTitle}>{emptyTitle}</Text>
        <Text style={styles.emptyMessage}>{emptyMessage}</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={expenses}
      keyExtractor={(item) => String(item.id)}
      renderItem={renderExpenseItem}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={renderEmptyList}
      contentContainerStyle={[
        styles.listContent,
        expenses.length === 0 && styles.emptyListContent,
      ]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listContent: {
    paddingTop: 4,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  emptyListContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 40,
    backgroundColor: '#FFFFFF',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    color: '#1E293B',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptyMessage: {
    color: '#64748B',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 8,
  },
});
