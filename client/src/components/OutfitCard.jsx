import React, { useState } from 'react';
import Carousel from './Carousel.jsx';
import OutfitDetails from './OutfitDetails.jsx';

function OutfitCard({ outfit, onDelete }) {
    const topItem = outfit.outfititems.find(item => item.item.category === "Top");
    const bottomItem = outfit.outfititems.find(item => item.item.category === "Bottom");
    
    const handleDelete = async () => {
        await onDelete(outfit.id);
    };

    return (
        <div className="outfit-card">
            <h2>{outfit.name}</h2>
            <div className="outfit-container">
                {topItem && (
                    <img src={topItem.item.image} alt="Top Item" className="top-item-image" />
                )}
                {bottomItem && (
                    <img src={bottomItem.item.image} alt="Bottom Item" className="bottom-item-image" />
                )}
            </div>
            <button id="delete-outfit-button" onClick={handleDelete}>❌</button>
        </div>
    );
}

export default OutfitCard;
