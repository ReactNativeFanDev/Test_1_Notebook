import { FlatList } from "react-native";
import NoteItem from "./NoteItem";

export default function ExpensesList({categories}) {
    function renderExpensesItem(itemData) {
        return(
            <NoteItem {...itemData.item} />
        )
    }
    
    return(
        <FlatList 
            data={categories} 
            renderItem={renderExpensesItem} 
            keyExtractor={(item) => item.id}
        />
    )
};