import React from 'react';
import { useOutletContext } from "react-router-dom";
import Item from "./Item.jsx";
import MyOutfits from './MyOutfits.jsx';

function MyCloset(){

    const { items, setItems, outfits, setOutfits } = useOutletContext();

    const handleItemDelete = async (id) => {
        try {
            const response = await fetch(`/api/my_closet/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setItems((prevItems) => prevItems.filter((item) => item.id !== id));
                setOutfits((prevOutfits) => {
                    // Filter out outfits that had the deleted item
                    return prevOutfits.filter((outfit) => !outfit.outfititems.some(oi => oi.item_id === id));
                });
            } else {
                const errorData = await response.json();
                console.error("Failed to delete item:", errorData);
            }
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    }

    const itemComponents = items.map(item => {
        return <Item key={item.id} item={item} onDelete={handleItemDelete}/>
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