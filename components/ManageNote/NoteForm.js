import { StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import {  useState } from "react";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";




export default function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {

    const [inputs, SetInputs] = useState({
        title: {
            value: defaultValues ? defaultValues.title.toString() : '',
            isValid: true,
        },
        text: {
            value: defaultValues ? defaultValues.text.toString() : '',
            isValid: true,
        },
    });


    function inputChangeHandler( inputIndentifier, enteredValues){
        SetInputs((curInputs) => {
            return {
                ...curInputs,
                [inputIndentifier]: { value: enteredValues, isValid: true },
            }
        });
    }


    function submitHandler(){

        const expenseData = {
            title: inputs.title.value,
            text: inputs.text.value,
        }

        const titleIsValid = expenseData.text.trim().length > 0;
        const textIsValid = expenseData.text.trim().length > 0;

        if(!titleIsValid || !textIsValid){
            SetInputs((curInputs) => {
                return {
                    title: { value: curInputs.title.value, isValid: titleIsValid},
                    text: { value: curInputs.text.value, isValid: textIsValid}
                };
            })
            return;
        }
        onSubmit(expenseData);
    }

    const formIsValid = !inputs.title.isValid || !inputs.text.isValid


    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your note</Text>

            <View style={styles.inputsRow}>
                <Input 
                    label='Title'
                    style={styles.rowInput}
                    inValid={!inputs.title.isValid}
                    textInputConfig={{
                        onChangeText: inputChangeHandler.bind(this, 'title'),
                        value: inputs.title.value,
                    }}
                />
            </View>

            <Input 
                label='Text' 
                inValid={!inputs.text.isValid}
                textInputConfig={{
                    multiline: true,
                    onChangeText: inputChangeHandler.bind(this, 'text'),
                    value: inputs.text.value,
                }}
            />
            {formIsValid && <Text style={styles.erorText}> Please check your entered data</Text>}
            <View style={styles.extraButtonsContainer}>
                <Button style={styles.button} mode='flat' onPress={onCancel}>Cancel</Button>
                <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1,
    },
    form:{
        marginTop: 40
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginBottom: 24,
    },
    extraButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    erorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8,
        fontSize: 18,
    },
})