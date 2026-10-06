import { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';

import {
  botaoAdicionar,
  listaVazia,
  placeholderCompromisso,
  tituloApp,
  tituloLista,
} from './labels';

const CHAVE_COMPROMISSOS = '@rotina_iesb_compromissos';

export default function App() {
  const [texto, setTexto] = useState('');
  const [compromissos, setCompromissos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const labels = {
    botaoAdicionar,
    listaVazia,
    placeholderCompromisso,
    tituloApp,
    tituloLista,
  };

  useEffect(() => {
    const carregarCompromissos = async () => {
      try {
        const dadosSalvos = await AsyncStorage.getItem(
          CHAVE_COMPROMISSOS
        );

        if (dadosSalvos) {
          const compromissosSalvos = JSON.parse(dadosSalvos);
          setCompromissos(compromissosSalvos);
        }
      } catch (error) {
        Alert.alert(
          'Erro',
          'Não foi possível carregar os compromissos salvos.'
        );
      } finally {
        setCarregando(false);
      }
    };

    carregarCompromissos();
  }, []);

  useEffect(() => {
    const salvarCompromissos = async () => {
      if (carregando) {
        return;
      }

      try {
        const dados = JSON.stringify(compromissos);

        await AsyncStorage.setItem(
          CHAVE_COMPROMISSOS,
          dados
        );
      } catch (error) {
        Alert.alert(
          'Erro',
          'Não foi possível salvar os compromissos.'
        );
      }
    };

    salvarCompromissos();
  }, [compromissos, carregando]);

  const adicionarCompromisso = () => {
    const textoLimpo = texto.trim();

    if (!textoLimpo) {
      Alert.alert(
        'Compromisso inválido',
        'Digite um compromisso antes de adicionar.'
      );
      return;
    }

    const novoCompromisso = {
      id: Date.now().toString(),
      texto: textoLimpo,
      criadoEm: new Date().toISOString(),
      concluido: false,
    };

    setCompromissos((listaAtual) => [
      ...listaAtual,
      novoCompromisso,
    ]);

    setTexto('');
  };

  const alternarConclusao = (id) => {
    setCompromissos((listaAtual) =>
      listaAtual.map((item) =>
        item.id === id
          ? { ...item, concluido: !item.concluido }
          : item
      )
    );
  };

  const removerCompromisso = (id) => {
    setCompromissos((listaAtual) =>
      listaAtual.filter((item) => item.id !== id)
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={require('./assets/logo.png')}
              style={styles.logo}
            />

            <View style={styles.headerText}>
              <Text style={styles.title}>{tituloApp}</Text>

              <Text style={styles.subtitle}>
                Organize sua rotina acadêmica
              </Text>
            </View>
          </View>

          <CompromissoInput
            value={texto}
            onChangeText={setTexto}
            onAdd={adicionarCompromisso}
            labels={labels}
          />

          <CompromissoList
            itens={compromissos}
            onToggle={alternarConclusao}
            onDelete={removerCompromisso}
            tituloLista={tituloLista}
            listaVazia={listaVazia}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F6FA',
  },

  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  logo: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 14,
  },

  headerText: {
    flex: 1,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E3A5F',
  },

  subtitle: {
    fontSize: 14,
    color: '#667085',
    marginTop: 4,
  },
});

