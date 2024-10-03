import React from 'react';

function OutfitDetails({currentItem, category}) {
    
    // item details only render when currentItem data is defined and received!!
    if (!currentItem) {
        return <h1>Loading {category} details...</h1>;
    }


    return(
        <div className="outfit-details">
            <div className={`${category.toLowerCase()}-details`}>
                <h3>{`- ${category} Details -`}</h3>
                <p>"{currentItem.brand}"</p>
                <p>Size: {currentItem.size}</p>
                <p>{currentItem.description}</p>
            </div>
        </div>

    )

}
export default OutfitDetails;