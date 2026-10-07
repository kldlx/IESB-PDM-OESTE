import { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import DespesaSaida from '../components/despesa/DespesaSaida';

const categorias = [
  'Todas',
  'Alimentação',
  'Transporte',
  'Lazer',
  'Contas',
];

export default function TodasDespesas({ despesas, navigation }) {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');

  function filtrarDespesas() {
    if (categoriaSelecionada === 'Todas') {
      return despesas;
    }

    return despesas.filter(
      (despesa) => despesa.categoria === categoriaSelecionada
    );
  }

  const despesasFiltradas = filtrarDespesas();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Todas as Despesas</Text>

      <View style={styles.botoes}>
        <Pressable
          style={styles.botaoAdicionar}
          onPress={() => navigation.navigate('GerenciarDespesa')}
        >
          <Text style={styles.textoBotaoAdicionar}>
            + Adicionar
          </Text>
        </Pressable>

        <Pressable
          style={styles.botaoRecentes}
          onPress={() => navigation.navigate('DespesasRecentes')}
        >
          <Text style={styles.textoBotaoRecentes}>
            Recentes
          </Text>
        </Pressable>
      </View>

      <View style={styles.filtros}>
        {categorias.map((categoria) => (
          <Pressable
            key={categoria}
            style={[
              styles.botaoFiltro,
              categoriaSelecionada === categoria &&
                styles.botaoFiltroSelecionado,
            ]}
            onPress={() => setCategoriaSelecionada(categoria)}
          >
            <Text
              style={[
                styles.textoFiltro,
                categoriaSelecionada === categoria &&
                  styles.textoFiltroSelecionado,
              ]}
            >
              {categoria}
            </Text>
          </Pressable>
        ))}
      </View>

      <DespesaSaida
        despesas={despesasFiltradas}
        periodo={`Categoria: ${categoriaSelecionada}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F1F5F9',
  },
  titulo: {
    marginBottom: 16,
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
  },
  botoes: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  botaoAdicionar: {
    paddingHorizontal: 16,
    paddingVertical: 9,
    backgroundColor: '#2563EB',
    borderRadius: 20,
  },
  textoBotaoAdicionar: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  botaoRecentes: {
  paddingHorizontal: 16,
  paddingVertical: 9,
  backgroundColor: '#2563EB',
  borderRadius: 20,
},

textoBotaoRecentes: {
  color: '#FFFFFF',
  fontSize: 14,
  fontWeight: '600',
},
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  botaoFiltro: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
  },
  botaoFiltroSelecionado: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  textoFiltro: {
    color: '#64748B',
    fontWeight: '500',
  },
  textoFiltroSelecionado: {
    color: '#FFFFFF',
  },
});