import { useLayoutEffect, useMemo } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { useExpenses } from '../store/expenses-context';

export default function GerenciarDespesa({ route, navigation }) {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();

  const expenseId = route.params?.expenseId;
  const isEditing = Boolean(expenseId);

  const existingExpense = useMemo(
    () => expenses.find((expense) => expense.id === expenseId),
    [expenses, expenseId]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar despesa' : 'Nova despesa',
    });
  }, [navigation, isEditing]);

  useLayoutEffect(() => {
    if (isEditing && !existingExpense) {
      Alert.alert(
        'Despesa não encontrada',
        'Essa despesa não existe mais.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }
  }, [isEditing, existingExpense, navigation]);

  function handleSubmit(expenseData) {
    if (isEditing) {
      updateExpense(expenseId, expenseData);
    } else {
      addExpense(expenseData);
    }

    navigation.goBack();
  }

  function handleDelete() {
    if (!expenseId || !existingExpense) {
      return;
    }

    deleteExpense(expenseId);
    navigation.goBack();
  }

  if (isEditing && !existingExpense) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <DespesaSaida
        key={expenseId || 'nova-despesa'}
        initialValues={existingExpense}
        isEditing={isEditing}
        onSubmit={handleSubmit}
        onCancel={() => navigation.goBack()}
        onDelete={isEditing ? handleDelete : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
