import {
    View,
    TextInput,
    Pressable,
    Text,
    StyleSheet,
} from 'react-native';

export default function MetaInput({
    value,
    onChangeText,
    onAdd,
}) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Digite uma nova meta..."
                placeholderTextColor="#999"
                value={value}
                onChangeText={onChangeText}
            />

            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    pressed && styles.buttonPressed,
                ]}
                onPress={onAdd}
                android_ripple={{
                    color: '#ffffff55',
                }}
            >
                <Text style={styles.buttonText}>
                    + Adicionar meta
                </Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },

    input: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#D9DEE7',
        borderRadius: 12,
        paddingHorizontal: 15,
        paddingVertical: 13,
        fontSize: 16,
        marginBottom: 10,
        color: '#1E293B',
    },

    button: {
        backgroundColor: '#1E3A5F',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        overflow: 'hidden',
    },

    buttonPressed: {
        opacity: 0.8,
    },

    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

