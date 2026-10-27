import { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Button,
} from 'react-native';

function MetaInput(props) {
  const [textoMeta, setTextoMeta] = useState('');

  function adicionarMeta() {
    if (textoMeta.trim().length === 0) {
      return;
    }

    props.onAdicionarMeta(textoMeta);

    setTextoMeta('');
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Digite uma meta"
        value={textoMeta}
        onChangeText={setTextoMeta}
      />

      <Button
        title="Adicionar"
        onPress={adicionarMeta}
      />
    </View>
  );
}

export default MetaInput;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
});