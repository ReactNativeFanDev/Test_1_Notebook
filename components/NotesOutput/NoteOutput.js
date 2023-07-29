import { StyleSheet, Text, View } from "react-native";
import NoteLits from "./NoteLits";
import { GlobalStyles } from "../../constants/styles";

export default function NoteOutput({categories, fallbackText, onlyFavorites}) {
    return(
        <View style={styles.container}>
            {categories.length > 0 ? <NoteLits categories={categories} onlyFavorites={onlyFavorites}/> : <Text style={styles.infoText}>{fallbackText}</Text>}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
    }
});