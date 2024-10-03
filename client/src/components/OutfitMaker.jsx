import React from 'react';
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import Carousel from "./Carousel.jsx";
import OutfitDetails from "./OutfitDetails.jsx";

function OutfitMaker() {

    const {items} = useOutletContext()


    // create the state for the displayed item
    const [displayedTopIndex, setDisplayedTopIndex] = useState(0)
    const [displayedBottomIndex, setDisplayedBottomIndex] = useState(0)
    const [topItems, setTopItems] = useState([]);
    const [bottomItems, setBottomItems] = useState([]);
    const [outfitName, setOutfitName] = useState("");
    
    useEffect(() => {
        if (items.length > 0) {
            // filter out just the tops type
            const tops = items.filter((item) => item.category === "Top");

             // filter out just the bottoms type
            const bottoms = items.filter((item) => item.category === "Bottom");

            // update the state of the tops array
            setTopItems(tops);

            // update the state of the bottoms array
            setBottomItems(bottoms);
        }
    }, [items]);

    
    const topItemsImages = topItems.map(item => item.image)
    const bottomItemsImages = bottomItems.map(item => item.image)
    const currentTopItem = topItems[displayedTopIndex];
    const currentBottomItem = bottomItems[displayedBottomIndex];
    
    async function saveOutfit() {
        const outfitData = {
            name: outfitName, 
            top_item_id: currentTopItem.id, 
            bottom_item_id: currentBottomItem.id 
        };
    
        try {
            const response = await fetch("/api/outfit_maker", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(outfitData),
            });
    
            if (!response.ok) {
                throw new Error('Failed to save outfit');
            }
    
            await response.json();
            setOutfitName("");

        } catch (error) {
            console.error("Error saving outfit:", error);
        }
    }
    
    return (
        <div className="outfit-maker-container">
            <div className="carousel-container">
                <Carousel itemsImages={topItemsImages} displayedIndex={displayedTopIndex} setDisplayedIndex={setDisplayedTopIndex} category="Top" />
                <Carousel itemsImages={bottomItemsImages} displayedIndex={displayedBottomIndex} setDisplayedIndex={setDisplayedBottomIndex} category="Bottom" />
            </div>
            <div className="outfit-details-container">
                <OutfitDetails currentItem={currentTopItem} category="Top" />
                <OutfitDetails currentItem={currentBottomItem} category="Bottom" />
            </div>
            <input 
                type="text" 
                placeholder="Enter outfit name" 
                value={outfitName} required
                id="outfit-name-input" 
                name="name"
                onChange={(e) => setOutfitName(e.target.value)} 
            />
            <button className="save-button" onClick={saveOutfit}>Save Outfit 🌟</button>
        </div>
    );
}

export default OutfitMaker;