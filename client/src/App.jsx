import React, { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom";
import Header from './components/Header.jsx';
import './App.css'

function App() {


  const [items, setItems] = useState([])
  const [outfits, setOutfits] = useState([]);

  useEffect(() => { 
    fetch("/api/my_closet")
    .then(response => response.json())
    .then(itemsData => setItems(itemsData))
  }, [])

  function addItem(newItem){
    fetch("/api/add_item", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(newItem)
    })
    .then(response => {
      if (!response.ok) {
          return response.json().then(err => Promise.reject(err));
      }
      return response.json();
    })
    .then(newItemData => setItems([...items, newItemData]))
    .catch(error => console.error('Error:', error));
  }

  return (
    <div className='App'>
      <Header/>
      <Outlet context={{
          items: items,
          setItems: setItems,
          addItem: addItem,
          outfits: outfits, // Pass outfits state here
          setOutfits: setOutfits // Pass setOutfits function here
        }}/>
        <footer>
          <p>Copyright &#169; 2024 iCloset. All Rights Reserved.</p>
        </footer>
    </div>
    
  );
}

export default App;
