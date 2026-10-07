import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';

const categorias = [
  'Alimentação',
  'Transporte',
  'Lazer',
  'Contas',
];

function formatarDataHoje() {
  const hoje = new Date();

  const dia = String(hoje.getDate()).padStart(2, '0');
  const mes = String(hoje.getMonth() + 1).padStart(2, '0');
  const ano = hoje.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

export default function GerenciarDespesa({ navigation, onAdicionarDespesa }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState(formatarDataHoje());

  function alterarValor(texto) {
    const regex = /^\d*\.?\d{0,2}$/;

    if (regex.test(texto)) {
      setValor(texto);
    }
  }

  function alterarData(texto) {
    const somenteNumeros = texto.replace(/\D/g, '');

    let dataFormatada = somenteNumeros;

    if (somenteNumeros.length > 2) {
      dataFormatada =
        somenteNumeros.slice(0, 2) +
        '/' +
        somenteNumeros.slice(2);
    }

    if (somenteNumeros.length > 4) {
      dataFormatada =
        somenteNumeros.slice(0, 2) +
        '/' +
        somenteNumeros.slice(2, 4) +
        '/' +
        somenteNumeros.slice(4, 8);
    }

    setData(dataFormatada);
  }

  function converterData(dataTexto) {
    if (dataTexto.length !== 10) {
      return null;
    }

    const partes = dataTexto.split('/');

    if (partes.length !== 3) {
      return null;
    }

    const dia = Number(partes[0]);
    const mes = Number(partes[1]);
    const ano = Number(partes[2]);

    if (
      dia < 1 ||
      dia > 31 ||
      mes < 1 ||
      mes > 12 ||
      ano < 1900
    ) {
      return null;
    }

    const dataConvertida = new Date(ano, mes - 1, dia);

    if (
      dataConvertida.getFullYear() !== ano ||
      dataConvertida.getMonth() !== mes - 1 ||
      dataConvertida.getDate() !== dia
    ) {
      return null;
    }

    return dataConvertida;
  }

  function enviarFormulario() {
    if (!descricao.trim()) {
      return;
    }

    if (!valor || Number(valor) <= 0) {
      return;
    }

    if (!categoria) {
      return;
    }

    const dataConvertida = converterData(data);

    if (!dataConvertida) {
      return;
    }

    const novaDespesa = {
      id: Date.now(),
      descricao: descricao.trim(),
      valor: Number(valor),
      categoria,
      data: dataConvertida.toISOString(),
    };

    onAdicionarDespesa(novaDespesa);

    navigation.navigate('TodasDespesas');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Gerenciar Despesa</Text>

      <Text style={styles.label}>Descrição</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex.: Almoço"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Valor</Text>

      <TextInput
        style={styles.input}
        placeholder="Ex.: 25.50"
        value={valor}
        onChangeText={alterarValor}
        keyboardType="decimal-pad"
      />

      <Text style={styles.label}>Categoria</Text>

      <View style={styles.categorias}>
        {categorias.map((item) => (
          <Pressable
            key={item}
            style={[
              styles.botaoCategoria,
              categoria === item && styles.botaoCategoriaSelecionado,
            ]}
            onPress={() => setCategoria(item)}
          >
            <Text
              style={[
                styles.textoCategoria,
                categoria === item && styles.textoCategoriaSelecionado,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Data</Text>

      <TextInput
        style={styles.input}
        placeholder="dd/mm/aaaa"
        value={data}
        onChangeText={alterarData}
        keyboardType="numeric"
        maxLength={10}
      />

      <Pressable
        style={styles.botaoSalvar}
        onPress={enviarFormulario}
      >
        <Text style={styles.textoBotaoSalvar}>
          Salvar Despesa
        </Text>
      </Pressable>
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
    marginBottom: 24,
    fontSize: 24,
    fontWeight: '700',
    color: '#0F172A',
  },
  label: {
    marginBottom: 8,
    fontSize: 15,
    fontWeight: '600',
    color: '#0F172A',
  },
  input: {
    height: 48,
    marginBottom: 18,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    fontSize: 16,
  },
  categorias: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  botaoCategoria: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
  },
  botaoCategoriaSelecionado: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  textoCategoria: {
    color: '#64748B',
    fontWeight: '500',
  },
  textoCategoriaSelecionado: {
    color: '#FFFFFF',
  },
  botaoSalvar: {
    alignItems: 'center',
    paddingVertical: 14,
    backgroundColor: '#2563EB',
    borderRadius: 8,
  },
  textoBotaoSalvar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});