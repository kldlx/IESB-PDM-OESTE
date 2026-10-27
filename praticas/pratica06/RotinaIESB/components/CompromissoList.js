import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function CompromissoList({
  itens,
  onToggle,
  onDelete,
  tituloLista,
  listaVazia,
}) {
  const renderItem = ({ item }) => {
    return (
      <View style={[styles.item, item.concluido && styles.itemConcluido]}>
        <Pressable
          style={({ pressed }) => [
            styles.itemButton,
            pressed && styles.itemPressed,
          ]}
          onPress={() => onToggle(item.id)}
          android_ripple={{ color: '#1E3A5F33' }}
        >
          <View style={styles.itemContent}>
            <View style={styles.checkArea}>
              <View
                style={[
                  styles.check,
                  item.concluido && styles.checkConcluido,
                ]}
              >
                {item.concluido && (
                  <Text style={styles.checkText}>✓</Text>
                )}
              </View>
            </View>

            <View style={styles.textArea}>
              <Text
                style={[
                  styles.itemText,
                  item.concluido && styles.itemTextConcluido,
                ]}
              >
                {item.texto}
              </Text>

              <Text style={styles.itemDate}>
                {new Date(item.criadoEm).toLocaleString('pt-BR')}
              </Text>
            </View>
          </View>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.deleteButton,
            pressed && styles.deleteButtonPressed,
          ]}
          onPress={() => onDelete(item.id)}
          android_ripple={{ color: '#FFFFFF55' }}
        >
          <Text style={styles.deleteText}>Excluir</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{tituloLista}</Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>{listaVazia}</Text>
        }
        contentContainerStyle={
          itens.length === 0 ? styles.emptyContainer : undefined
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E3A5F',
    marginBottom: 12,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#D6DCE5',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },

  itemConcluido: {
    backgroundColor: '#EAF7EE',
    borderColor: '#A8D5B5',
  },

  itemButton: {
    flex: 1,
    padding: 14,
  },

  itemPressed: {
    opacity: 0.7,
  },

  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  checkArea: {
    marginRight: 12,
  },

  check: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#1E3A5F',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkConcluido: {
    backgroundColor: '#2E8B57',
    borderColor: '#2E8B57',
  },

  checkText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  textArea: {
    flex: 1,
  },

  itemText: {
    fontSize: 16,
    color: '#222222',
    fontWeight: '500',
  },

  itemTextConcluido: {
    color: '#2E8B57',
    fontWeight: 'bold',
  },

  itemDate: {
    fontSize: 12,
    color: '#777777',
    marginTop: 5,
  },

  deleteButton: {
    width: 76,
    height: '100%',
    backgroundColor: '#B42318',
    justifyContent: 'center',
    alignItems: 'center',
  },

  deleteButtonPressed: {
    opacity: 0.7,
  },

  deleteText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },

  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    fontSize: 15,
    color: '#777777',
    textAlign: 'center',
  },
});
