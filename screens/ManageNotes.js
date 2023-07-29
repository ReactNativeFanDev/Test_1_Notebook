import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import NoteForm from "../components/ManageNote/NoteForm";
import { LangContext } from "../store/sqlite-context";




export default function ManageExpenses({route, navigation}) {

    const langCtx = useContext(LangContext);


    const itemId = route.params?.expenceId;

    const isEditing = !!itemId;
    
    
    async function deleteExpenseHandler() {
        langCtx.deleteCategory(itemId);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler({text, title}) {
        const favorite = false;
        if(isEditing) {
            langCtx.updateText(text, title, itemId, favorite);
        } else {
            langCtx.addText(text, title, favorite );
        }
        navigation.goBack();
    }

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: isEditing ? 'Edit' : 'Add'
        });
    }, [navigation, isEditing])


    return(
        <View style={styles.container}>
            <NoteForm 
                onCancel={cancelHandler} 
                submitButtonLabel={isEditing ? "Update" : "Add"} 
                onSubmit={confirmHandler} 
            />
            {isEditing && 
                <View style={styles.deleteContainer}>
                    <IconButton icon='dropbox' size={46} color={GlobalStyles.colors.error500} onPress={deleteExpenseHandler}/>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    },
})