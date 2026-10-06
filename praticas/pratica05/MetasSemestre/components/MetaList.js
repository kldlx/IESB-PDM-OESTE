import {
    View,
    Text,
    Pressable,
    FlatList,
    StyleSheet,
} from 'react-native';

export default function MetaList({
    metas,
    onDelete,
    onToggle,
}) {
    return (
        <FlatList
            data={metas}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
                metas.length === 0 && styles.listaVazia
            }
            renderItem={({ item }) => (
                <View
                    style={[
                        styles.item,
                        item.concluida && styles.itemConcluido,
                    ]}
                >
                    <Pressable
                        style={styles.info}
                        onPress={() => onToggle(item.id)}
                        android_ripple={{
                            color: '#1E3A5F22',
                        }}
                    >
                        <View style={styles.linhaPrincipal}>
                            <View
                                style={[
                                    styles.indicador,
                                    item.concluida &&
                                        styles.indicadorConcluido,
                                ]}
                            />

                            <Text
                                style={[
                                    styles.texto,
                                    item.concluida &&
                                        styles.textoConcluido,
                                ]}
                            >
                                {item.texto}
                            </Text>
                        </View>

                        <Text style={styles.data}>
                            Criada em: {item.criadaEm}
                        </Text>

                        <Text
                            style={[
                                styles.status,
                                item.concluida &&
                                    styles.statusConcluido,
                            ]}
                        >
                            {item.concluida
                                ? '✓ Concluída'
                                : '○ Pendente'}
                        </Text>
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => [
                            styles.deleteButton,
                            pressed &&
                                styles.deleteButtonPressed,
                        ]}
                        onPress={() => onDelete(item.id)}
                        android_ripple={{
                            color: '#ffffff55',
                        }}
                    >
                        <Text style={styles.deleteText}>
                            Excluir
                        </Text>
                    </Pressable>
                </View>
            )}
            ListEmptyComponent={
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyIcon}>
                        📚
                    </Text>

                    <Text style={styles.vazioTitulo}>
                        Nenhuma meta ainda
                    </Text>

                    <Text style={styles.vazio}>
                        Adicione sua primeira meta de estudo!
                    </Text>
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 15,
        marginBottom: 12,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        overflow: 'hidden',
    },

    itemConcluido: {
        backgroundColor: '#F1FAF3',
        borderColor: '#C9E8D0',
    },

    info: {
        flex: 1,
        marginRight: 10,
        padding: 3,
    },

    linhaPrincipal: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 7,
    },

    indicador: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#1E3A5F',
        marginRight: 10,
    },

    indicadorConcluido: {
        backgroundColor: '#35A853',
    },

    texto: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: '#1F2937',
    },

    textoConcluido: {
        color: '#35A853',
        fontWeight: '700',
    },

    data: {
        fontSize: 12,
        color: '#888888',
        marginBottom: 5,
    },

    status: {
        fontSize: 13,
        color: '#2563EB',
        fontWeight: '600',
    },

    statusConcluido: {
        color: '#35A853',
        fontWeight: '700',
    },

    deleteButton: {
        backgroundColor: '#D9534F',
        paddingVertical: 9,
        paddingHorizontal: 12,
        borderRadius: 8,
        overflow: 'hidden',
    },

    deleteButtonPressed: {
        opacity: 0.75,
    },

    deleteText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
    },

    listaVazia: {
        flexGrow: 1,
    },

    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 50,
    },

    emptyIcon: {
        fontSize: 42,
        marginBottom: 10,
    },

    vazioTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 5,
    },

    vazio: {
        textAlign: 'center',
        color: '#888888',
        fontSize: 14,
    },
});
