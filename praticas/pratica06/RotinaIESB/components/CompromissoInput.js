import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function CompromissoInput({
  value,
  onChangeText,
  onAdd,
  labels,
}) {
  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={labels.placeholderCompromisso}
        placeholderTextColor="#777777"
      />

      <Pressable
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}
        onPress={onAdd}
        android_ripple={{ color: '#ffffff55' }}
      >
        <Text style={styles.buttonText}>{labels.botaoAdicionar}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },

  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#1E3A5F',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
  },

  button: {
    width: '28%',
    height: 48,
    borderRadius: 8,
    backgroundColor: '#1E3A5F',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  buttonPressed: {
    opacity: 0.7,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});