import React,{ useState, useEffect } from 'react'
import { Outlet } from "react-router-dom";
import Header from './components/Header';
import './App.css'

function App() {


  const [items, setItems] = useState([])

  useEffect(() => { 
    fetch("http://localhost:5173/items")
    .then(response => response.json())
    .then(itemsData => setItems(itemsData))
  }, [])

  function addItem(newItem){
    fetch("http://localhost:5173/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newItem)
    })
    .then(response => response.json())
    .then(newItemData => setItems([...items, newItemData]))
  }

  return (
    <div className="App">
      <Header/>
      <Outlet context={{
          items: items,
          addItem: addItem

        }}/>
        <footer>
           <p>Copyright &#169; 2024 iCloset. All Rights Reserved.</p>
        </footer>
    </div>
    
  );
}

export default App;
