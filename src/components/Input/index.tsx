import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {}

export function Input({ ...rest }: InputProps) {
    return (
        <View style={styles.container}>
            <TextInput 
                {...rest}
                style={styles.input}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 20,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#DEE2E8',
        backgroundColor: '#FFF',
    },
    input: {
        padding: 16,
        fontSize: 18,
    }
})