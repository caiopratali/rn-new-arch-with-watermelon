import { StyleSheet, TouchableOpacity, Text, TouchableOpacityProps } from "react-native";

export interface TaskProps {
    id: string;
    name: string;
    isComplete: boolean;
}

type Props = Omit<TaskProps, "id"> & TouchableOpacityProps;

export function Task({ name, isComplete, ...rest }: Props) {

    const textDecorationLine = isComplete ? 'line-through' : 'none';

    return (
        <TouchableOpacity activeOpacity={0.6} style={styles.container} {...rest}>
            <Text style={[styles.text, { textDecorationLine }]}>{ name }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 8,
        marginHorizontal: 20,
        borderColor: '#DEE2E8',
        backgroundColor: '#EEE',
    },
    text: {
        fontSize: 18,
        textDecorationLine: 'line-through'
    }
})