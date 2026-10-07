import { View, Text, StyleSheet } from 'react-native';

function getDataFormatada(data) {
  const dataObjeto = new Date(data);

  return dataObjeto.toLocaleDateString('pt-BR');
}

export default function DespesaItem({ despesa }) {
  return (
    <View style={styles.item}>
      <View style={styles.informacoes}>
        <View style={styles.linha}>
          <Text style={styles.descricao}>{despesa.descricao}</Text>

          <View style={styles.categoria}>
            <Text style={styles.categoriaTexto}>{despesa.categoria}</Text>
          </View>
        </View>

        <Text style={styles.data}>{getDataFormatada(despesa.data)}</Text>
      </View>

      <Text style={styles.valor}>
        R$ {Number(despesa.valor).toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginVertical: 6,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  informacoes: {
    flex: 1,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  descricao: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
  },
  categoria: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#E2E8F0',
    borderRadius: 12,
  },
  categoriaTexto: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  data: {
    marginTop: 5,
    fontSize: 13,
    color: '#64748B',
  },
  valor: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '700',
    color: '#EF4444',
  },
});