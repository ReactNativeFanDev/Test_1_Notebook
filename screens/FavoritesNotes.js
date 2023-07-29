import NoteOutput from "../components/NotesOutput/NoteOutput";
import { useContext } from "react";
import { LangContext } from "../store/sqlite-context";

export default function RecentExpenses() {

    const langCtx = useContext(LangContext);
    const categories = langCtx.langIdx.filter((note)=> note.favorite==true);
    
    return(
        <NoteOutput 
            categories={categories}
            onlyFavorites={true}
            fallbackText="You don't have favorites note"
        />
    )
}