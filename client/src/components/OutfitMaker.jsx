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
    
    useEffect(() => {
        if (items.length > 0) {
            // filter out just the tops type
            const tops = items.filter((item) => item.type === "Top");

             // filter out just the bottoms type
            const bottoms = items.filter((item) => item.type === "Bottom");

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
    

    
    return(
        <div className="outfit-maker-container">
            <div className="carousel-container">
                <Carousel itemsImages={topItemsImages} displayedIndex={displayedTopIndex} setDisplayedIndex={setDisplayedTopIndex} type="Top"/>
                <Carousel itemsImages={bottomItemsImages} displayedIndex={displayedBottomIndex} setDisplayedIndex={setDisplayedBottomIndex} type="Bottom"/>
            </div>
            <div className="outfit-details-container">
                <OutfitDetails currentItem={currentTopItem} type="Top"/>
                <OutfitDetails currentItem={currentBottomItem} type="Bottom"/>
            </div>
        </div>
    )
}

export default OutfitMaker;