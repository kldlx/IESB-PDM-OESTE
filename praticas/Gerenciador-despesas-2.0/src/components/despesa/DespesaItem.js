
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors, getCategoryLabel, Categories } from '../../constants/theme';

const theme = Colors.light;

export default function DespesaItem({ expense, onPress }) {
  const category = Categories.find(
    (item) => item.id === expense.category
  );

  const amount = Number(expense.amount || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const formattedDate = expense.date
    ? new Date(`${expense.date}T12:00:00`).toLocaleDateString('pt-BR')
    : '';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Editar despesa ${expense.description}`}
      style={({ pressed }) => [
        styles.card,
        {
          opacity: pressed ? 0.8 : 1,
        },
        Platform.select({
          ios: styles.iosShadow,
          android: { elevation: 2 },
          default: {},
        }),
      ]}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{category?.icon || '📦'}</Text>
      </View>

      <View style={styles.details}>
        <Text
          style={styles.description}
          numberOfLines={1}
        >
          {expense.description}
        </Text>

        <Text style={styles.category}>
          {getCategoryLabel(expense.category)}
          {formattedDate ? ` · ${formattedDate}` : ''}
        </Text>
      </View>

      <Text style={styles.amount}>{amount}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#DBEAFE',
    backgroundColor: '#FFFFFF',
  },
  iosShadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 5,
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 22,
  },
  details: {
    flex: 1,
    marginRight: 8,
  },
  description: {
    color: '#1E293B',
    fontSize: 15,
    fontWeight: '600',
  },
  category: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 5,
  },
  amount: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '700',
  },
});
