import { useEffect, useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
} from 'react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const CHAVE_METAS = '@metas_semestre';

export default function App() {
    const [texto, setTexto] = useState('');
    const [metas, setMetas] = useState([]);
    const [carregamentoConcluido, setCarregamentoConcluido] = useState(false);

    // Carrega as metas salvas no AsyncStorage
    useEffect(() => {
        async function carregarMetas() {
            try {
                const dadosSalvos = await AsyncStorage.getItem(CHAVE_METAS);

                if (dadosSalvos) {
                    const metasSalvas = JSON.parse(dadosSalvos);

                    const metasAtualizadas = metasSalvas.map((meta) => ({
                        ...meta,
                        concluida: meta.concluida ?? false,
                    }));

                    setMetas(metasAtualizadas);
                }
            } catch (error) {
                Alert.alert(
                    'Erro',
                    'Não foi possível carregar suas metas.'
                );
            } finally {
                setCarregamentoConcluido(true);
            }
        }

        carregarMetas();
    }, []);

    // Salva as metas sempre que a lista for alterada
    useEffect(() => {
        if (!carregamentoConcluido) {
            return;
        }

        async function salvarMetas() {
            try {
                const dados = JSON.stringify(metas);

                await AsyncStorage.setItem(
                    CHAVE_METAS,
                    dados
                );
            } catch (error) {
                Alert.alert(
                    'Erro',
                    'Não foi possível salvar suas metas.'
                );
            }
        }

        salvarMetas();
    }, [metas, carregamentoConcluido]);

    function adicionarMeta() {
        const textoLimpo = texto.trim();

        if (textoLimpo === '') {
            Alert.alert(
                'Meta inválida',
                'Digite uma meta antes de adicionar.'
            );
            return;
        }

        const novaMeta = {
            id: Date.now().toString(),
            texto: textoLimpo,
            criadaEm: new Date().toLocaleDateString('pt-BR'),
            concluida: false,
        };

        setMetas((metasAtuais) => [
            ...metasAtuais,
            novaMeta,
        ]);

        setTexto('');
    }

    function removerMeta(id) {
        setMetas((metasAtuais) =>
            metasAtuais.filter((meta) => meta.id !== id)
        );
    }

    function alternarConclusao(id) {
        setMetas((metasAtuais) =>
            metasAtuais.map((meta) =>
                meta.id === id
                    ? {
                        ...meta,
                        concluida: !meta.concluida,
                    }
                    : meta
            )
        );
    }

    const metasPendentes = metas.filter(
        (meta) => !meta.concluida
    ).length;

    const metasConcluidas = metas.filter(
        (meta) => meta.concluida
    ).length;

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={require('./assets/icon.png')}
                        style={styles.logo}
                    />

                    <Text style={styles.titulo}>
                        MetasSemestre
                    </Text>

                    <Text style={styles.subtitulo}>
                        Organize suas metas acadêmicas
                    </Text>

                    <Text style={styles.contador}>
                        {metasPendentes} pendentes / {metasConcluidas}{' '}
                        {metasConcluidas === 1
                            ? 'concluída'
                            : 'concluídas'}
                    </Text>
                </View>

                <MetaInput
                    value={texto}
                    onChangeText={setTexto}
                    onAdd={adicionarMeta}
                />

                <MetaList
                    metas={metas}
                    onDelete={removerMeta}
                    onToggle={alternarConclusao}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
        paddingHorizontal: 20,
    },

    header: {
        alignItems: 'center',
        marginBottom: 22,
        paddingTop: 10,
    },

    logo: {
        width: 70,
        height: 70,
        marginBottom: 10,
        borderRadius: 16,
    },

    titulo: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1E3A5F',
    },

    subtitulo: {
        fontSize: 15,
        color: '#667085',
        marginTop: 5,
        textAlign: 'center',
    },

    contador: {
        fontSize: 14,
        color: '#1E3A5F',
        fontWeight: '600',
        marginTop: 10,
        backgroundColor: '#E8EEF5',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        overflow: 'hidden',
    },
});

