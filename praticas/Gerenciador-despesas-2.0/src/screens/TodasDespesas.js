
import { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Colors, Categories } from '../constants/theme';
import { useExpenses } from '../store/expenses-context';
import useDebounce from '../hooks/useDebounce';
import DespesaLista from '../components/despesa/DespesaLista';
import DespesaSumario from '../components/despesa/DespesaSumario';

const theme = Colors.light;

export default function TodasDespesas({ navigation }) {
  const { expenses, deleteExpense } = useExpenses();

  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todas');
  const [showClearModal, setShowClearModal] = useState(false);

  const debouncedSearch = useDebounce(searchText);

  const filteredExpenses = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase();

    return expenses.filter((expense) => {
      const matchesSearch = expense.description
        .toLowerCase()
        .includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === 'todas' ||
        expense.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [expenses, debouncedSearch, selectedCategory]);

  function handleSelectExpense(expenseId) {
    navigation.navigate('GerenciarDespesa', { expenseId });
  }

  function handleAddExpense() {
    navigation.navigate('GerenciarDespesa');
  }

  function handleClearExpenses() {
    if (expenses.length === 0) {
      return;
    }

    setShowClearModal(true);
  }

  function handleConfirmClear() {
    expenses.forEach((expense) => deleteExpense(expense.id));
    setSearchText('');
    setSelectedCategory('todas');
    setShowClearModal(false);
  }

  const header = (
    <View style={styles.header}>
      <View style={styles.heading}>
        <View style={styles.headingText}>
          <Text style={styles.eyebrow}>CONTROLE FINANCEIRO</Text>
          <Text style={styles.title}>Minhas despesas</Text>
          <Text style={styles.subtitle}>
            Acompanhe seus gastos em um só lugar.
          </Text>
        </View>

        <Pressable
          onPress={handleAddExpense}
          style={({ pressed }) => [
            styles.addButton,
            { backgroundColor: pressed ? '#1D4ED8' : theme.primary },
          ]}
          accessibilityRole="button"
        >
          <Text style={styles.addButtonText}>+ Nova</Text>
        </Pressable>
      </View>

      <View style={styles.summary}>
        <DespesaSumario expenses={filteredExpenses} />
      </View>

      <Text style={styles.sectionLabel}>Pesquisar despesas</Text>

      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        placeholder="Buscar por descrição..."
        placeholderTextColor={theme.textSecondary}
        returnKeyType="search"
        style={styles.searchInput}
        accessibilityLabel="Pesquisar despesas por descrição"
      />

      <Text style={[styles.sectionLabel, styles.categoryLabel]}>
        Categorias
      </Text>

      <View style={styles.categories}>
        {[
          { id: 'todas', label: 'Todas', icon: '📋' },
          ...Categories,
        ].map((category) => {
          const isSelected = selectedCategory === category.id;

          return (
            <Pressable
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
              style={({ pressed }) => [
                styles.categoryChip,
                isSelected && styles.categoryChipSelected,
                { opacity: pressed ? 0.75 : 1 },
              ]}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
            >
              <Text
                style={[
                  styles.categoryChipText,
                  isSelected && styles.categoryChipTextSelected,
                ]}
              >
                {category.icon} {category.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.listHeading}>
        <View>
          <Text style={styles.listTitle}>Suas despesas</Text>
          <Text style={styles.resultCount}>
            {filteredExpenses.length} resultado(s)
          </Text>
        </View>

        {expenses.length > 0 ? (
          <Pressable
            onPress={handleClearExpenses}
            accessibilityRole="button"
          >
            <Text style={styles.clearText}>Limpar tudo</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <DespesaLista
        expenses={filteredExpenses}
        onSelectExpense={handleSelectExpense}
        ListHeaderComponent={header}
        emptyTitle={
          expenses.length === 0
            ? 'Nenhuma despesa cadastrada'
            : 'Nenhum resultado encontrado'
        }
        emptyMessage={
          expenses.length === 0
            ? 'Toque em "+ Nova" para registrar seu primeiro gasto.'
            : 'Tente mudar a pesquisa ou selecionar outra categoria.'
        }
      />

      <Modal
        visible={showClearModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowClearModal(false)}
      >
        <View style={styles.confirmOverlay}>
          <View style={styles.confirmContent}>
            <Text style={styles.confirmTitle}>
              Limpar todas as despesas
            </Text>

            <Text style={styles.confirmMessage}>
              Tem certeza de que deseja excluir todas as despesas? Esta ação
              não pode ser desfeita.
            </Text>

            <View style={styles.confirmActions}>
              <Pressable
                onPress={() => setShowClearModal(false)}
                style={({ pressed }) => [
                  styles.confirmCancelButton,
                  { opacity: pressed ? 0.75 : 1 },
                ]}
                accessibilityRole="button"
              >
                <Text style={styles.confirmCancelText}>Cancelar</Text>
              </Pressable>

              <Pressable
                onPress={handleConfirmClear}
                style={({ pressed }) => [
                  styles.confirmDeleteButton,
                  { opacity: pressed ? 0.8 : 1 },
                ]}
                accessibilityRole="button"
              >
                <Text style={styles.confirmDeleteText}>Excluir tudo</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 8,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
    gap: 12,
  },
  headingText: {
    flex: 1,
  },
  eyebrow: {
    color: '#2563EB',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1.3,
    marginBottom: 5,
  },
  title: {
    color: '#1E293B',
    fontSize: 25,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    color: '#64748B',
    fontSize: 13,
    marginTop: 5,
    lineHeight: 19,
  },
  addButton: {
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
  },
  summary: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionLabel: {
    color: '#1E293B',
    fontSize: 13,
    fontWeight: '700',
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 7,
  },
  searchInput: {
    minHeight: 46,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    backgroundColor: '#FFFFFF',
    color: '#1E293B',
    paddingHorizontal: 14,
    marginHorizontal: 16,
    fontSize: 14,
  },
  categoryLabel: {
    marginTop: 18,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 16,
  },
  categoryChip: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  categoryChipSelected: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
  },
  categoryChipText: {
    color: '#334155',
    fontSize: 12,
    fontWeight: '600',
  },
  categoryChipTextSelected: {
    color: '#2563EB',
  },
  listHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 8,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DBEAFE',
  },
  listTitle: {
    color: '#1E293B',
    fontSize: 16,
    fontWeight: '800',
  },
  resultCount: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 3,
  },
  clearText: {
    color: '#DC2626',
    fontSize: 12,
    fontWeight: '700',
  },
  confirmOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
  },
  confirmContent: {
    width: '100%',
    maxWidth: 420,
    borderRadius: 16,
    padding: 22,
    backgroundColor: '#FFFFFF',
  },
  confirmTitle: {
    color: '#1E293B',
    fontSize: 19,
    fontWeight: '700',
    marginBottom: 12,
  },
  confirmMessage: {
    color: '#64748B',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 22,
  },
  confirmActions: {
    flexDirection: 'row',
    gap: 10,
  },
  confirmCancelButton: {
    flex: 1,
    minHeight: 46,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  confirmCancelText: {
    color: '#2563EB',
    fontWeight: '600',
    fontSize: 14,
  },
  confirmDeleteButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 10,
    backgroundColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  confirmDeleteText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});
