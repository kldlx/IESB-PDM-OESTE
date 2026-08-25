import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export function TaskCard({ title, onDelete }) {
  return (
    <View style={styles.card}>

      <Text style={styles.task}>
        {title}
      </Text>

      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.delete}>X</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },

  task: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
  },

  delete: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});