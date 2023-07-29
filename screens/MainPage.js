import NotesOutput from "../components/NotesOutput/NoteOutput";
import { useContext } from "react";
import { LangContext } from "../store/sqlite-context";


export default function MainPage() {
  
  const langCtx = useContext(LangContext);
  const categories = langCtx.langIdx;

  return (
    <NotesOutput
      categories={categories}
      fallbackText="Please add note.."
    />
  );
}




