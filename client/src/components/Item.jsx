import React from 'react';

function Item({item, onDelete}){

    const handleItemDelete = async () => {
        await onDelete(item.id);
    };

    return (
        <article className="closet-items">
            <li className="item-card" key={item.id}>
            <img className="closet-item-img" src={item.image} alt={item.description}/>
            <h2>{item.category}</h2>
            <h2>{item.brand}</h2>
            <h2>Size: {item.size}</h2>
            <h3>"{item.description}"</h3>
            <button id="item-delete-button" onClick={handleItemDelete}>❌</button>
            </li>
        </article>
    )
}

export default Item;