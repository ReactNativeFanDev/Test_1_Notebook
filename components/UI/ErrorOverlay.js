import { StyleSheet, View, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "./Button";

export default function ErrorOverlay({message, onCorfirm}) {
    return(
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>An arror acured!</Text>
            <Text style={styles.text}>{message}</Text>
            <Button onPress={onCorfirm}>Fine</Button>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    text: {
        textAlign: 'center',
        marginBottom: 8,
        color: 'white',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    message: {
        fontSize: 14,
    }
})