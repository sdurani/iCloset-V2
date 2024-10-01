

function OutfitDetails({currentItem, type}) {
    
    // item details only render when currentItem data is defined and received!!
    if (!currentItem) {
        return <h1>Loading {type} details...</h1>;
    }


    return(
        <div className="outfit-details">
            <div className={`${type.toLowerCase()}-details`}>
                <h3>{`- ${type} Details -`}</h3>
                <p>"{currentItem.brand}"</p>
                <p>Size: {currentItem.size}</p>
                <p>{currentItem.description}</p>
            </div>
        </div>

    )

}
export default OutfitDetails;