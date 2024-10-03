import React from 'react';

function Carousel({itemsImages, displayedIndex, setDisplayedIndex, category}) {

    function displayNextItem () {
        setDisplayedIndex((previousItemIndex) => previousItemIndex === itemsImages.length - 1 ? 0 : previousItemIndex + 1)
    }

    function displayPreviousItem () {
        setDisplayedIndex((previousItemIndex) => previousItemIndex === 0 ? itemsImages.length - 1 : previousItemIndex - 1)
    }
       
    
    return (
        <div className={`${category.toLowerCase()}-carousel`}>
            <button onClick={displayPreviousItem} className={`${category.toLowerCase()}-previous-button`}>&lt;</button>
            <img src={itemsImages[displayedIndex]} alt={`${category} ${displayedIndex}`} className={`${category.toLowerCase()}-carousel-img`}/>
            <button onClick={displayNextItem} className={`${category.toLowerCase()}-next-button`}>&gt;</button>
        </div>
    )
}

export default Carousel;