import { useState, useEffect, createContext } from 'react';
import { openDatabase } from "react-native-sqlite-storage";

export const LangContext = createContext({
  langIdx: [],
  changeLangIdx: (langIdx) => {},
  addText: (text, title, favorite) => {},
  deleteCategory: (itemId)=> {},
  updateText: (text, title, itemId, favorite) => {},
  getCategories: (replace) => {},
})

const db = openDatabase({
  name: "rn_sqlite",
});
  
export default function LangContextProvider({ children }) {
  const [newLangIdx, setNewLangIdx] = useState([]);

  const createTables = () => {
    db.transaction((txn) => {
      txn.executeSql(
        `
        CREATE TABLE IF NOT EXISTS categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          text TEXT,
          title TEXT,
          favorite BOOLEAN
        )
        `,
        [],
        () => {
        },
        (error) => {
          console.log("Error creating categories table: " + error.message);
        }
      );
    });
  };

  function getCategories (replace) {
    console.log(replace)
    db.transaction((txn) => {
    txn.executeSql(
      replace == "Abs" ?
      `SELECT * FROM categories ORDER BY id DESC` :
      `SELECT * FROM categories ORDER BY title ASC, id DESC`,
      [],
      (sqlTxn, res) => {
      let len = res.rows.length;
      if (len > 0) {
        let results = [];
        for (let i = 0; i < len; i++) {
          let item = res.rows.item(i);
          results.push({ id: item.id, text: item.text, title: item.title, favorite: item.favorite });
        }
        setNewLangIdx(results);
      }
      },
      (error) => {
      console.log("error on getting categories " + error.message);
      }
    );
    });   
  };

  function addText(text, title) {
    if (!text) {
      alert("Enter text");
      return;
    }

    db.transaction((txn) => {
      txn.executeSql(
      `INSERT INTO categories (text, title, favorite) VALUES (?, ?, ?)`,
      [text, title, false],
      () => {
        setCategories((prevCategories) => [
          {  id: prevCategories.length + 1, text: text, title: title }, ...prevCategories,
        ]);
      },
      (error) => console.log("error on adding text " + error.message)
      );
    });
    getCategories();
  };

  function deleteCategory(itemId) {
    db.transaction((txn) => {
      txn.executeSql(
        `DELETE FROM categories WHERE id = ?`,
        [itemId],
        () => {
        },
        (error) => console.log("error on deleting description " + error.message)
      );
    });
    getCategories();
  };

  function updateText(text, title, itemId, favorite) {
    db.transaction((txn) => {
      txn.executeSql(
        `UPDATE categories SET text = ?, title = ?, favorite = ? WHERE id = ?`, 
        [text, title, favorite, itemId], 
        () => {
          getCategories(); 
        },
        (error) => console.log("error on updating category " + error.message)
      );
    });
  }


  useEffect(() => {
    createTables();
    getCategories();
  }, []);

  

  function changeLangIdx(langIdx) {
    setNewLangIdx(langIdx);
  }
  
  const value = {
    langIdx: newLangIdx,
    changeLangIdx: changeLangIdx,
    addText: addText,
    deleteCategory: deleteCategory,
    updateText: updateText,
    getCategories: getCategories,
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
