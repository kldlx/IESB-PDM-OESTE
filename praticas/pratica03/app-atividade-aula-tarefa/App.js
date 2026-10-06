import { StyleSheet, View, Image } from 'react-native';
import { useState } from 'react';
import MetasList from './components/MetasList';
import MetaInput from './components/MetaInput';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

export default function App() {
  const [metas, setMetas] = useState([]);

  function adicionarMetaHandler(inputMeta) {
    const novaMeta = {
      id: Math.random().toString(),
      texto: inputMeta,
    };

    setMetas((metasAtuais) => [...metasAtuais, novaMeta]);
  }

  function deletarMetaHandler(id) {
    const novasMetas = metas.filter(
      (meta) => meta.id !== id
    );

    setMetas(novasMetas);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>

        <View style={styles.imageContainer}>
          <Image
            source={require('./assets/favicon.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <MetaInput
          onAdicionarMeta={adicionarMetaHandler}
        />

        <View style={styles.metaContainer}>
          <MetasList
            array={metas}
            onDeletarMeta={deletarMetaHandler}
          />
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },

  metaContainer: {
    flex: 1,
  },

  imageContainer: {
    alignItems: 'flex-start',
    marginTop: 10,
    paddingLeft: 30,
  },

  image: {
    width: 50,
    height: 50,
  },
});