import React from 'react';
import { useOutletContext } from "react-router-dom";
import Item from "./Item.jsx";

function MyCloset(){

    const {items} = useOutletContext()
    
    const itemComponents = items.map(item => {
        return <Item key={item.id} item={item}/>
    })
    

    return (
        <div className="closet-container">
            <ul className="item-cards">
                {itemComponents}
            </ul>
        </div>
    )
}

export default MyCloset;