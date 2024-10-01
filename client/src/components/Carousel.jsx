

function Carousel({itemsImages, displayedIndex, setDisplayedIndex, type}) {

    function displayNextItem () {
        setDisplayedIndex((previousItemIndex) => previousItemIndex === itemsImages.length - 1 ? 0 : previousItemIndex + 1)
    }

    function displayPreviousItem () {
        setDisplayedIndex((previousItemIndex) => previousItemIndex === 0 ? itemsImages.length - 1 : previousItemIndex - 1)
    }
       
    
    return (
        <div className={`${type.toLowerCase()}-carousel`}>
            <button onClick={displayPreviousItem} className={`${type.toLowerCase()}-previous-button`}>&lt;</button>
            <img src={itemsImages[displayedIndex]} alt={`${type} ${displayedIndex}`} className={`${type.toLowerCase()}-carousel-img`}/>
            <button onClick={displayNextItem} className={`${type.toLowerCase()}-next-button`}>&gt;</button>
        </div>
    )
}

export default Carousel;