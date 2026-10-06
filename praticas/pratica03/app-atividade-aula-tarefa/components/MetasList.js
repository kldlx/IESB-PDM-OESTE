import {
  Pressable,
  StyleSheet,
  Text,
  ScrollView,
  View,
} from 'react-native';

function MetasList(props) {
  return (
    <ScrollView>
      {props.array.map((meta) => {
        return (
          <View key={meta.id} style={styles.item}>
            <Pressable
              android_ripple={{ color: 'yellow' }}
              onPress={() => props.onDeletarMeta(meta.id)}
            >
              <Text style={styles.texto}>
                {meta.texto}
              </Text>
            </Pressable>
          </View>
        );
      })}
    </ScrollView>
  );
}

export default MetasList;

const styles = StyleSheet.create({
  item: {
    margin: 8,
    borderRadius: 5,
    padding: 10,
    backgroundColor: 'lightblue',
  },

  texto: {
    padding: 8,
  },
});