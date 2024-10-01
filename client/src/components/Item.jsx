

function Item({item}){


    return (
        <article className="closet-items">
            <li className="item-card" key={item.id}>
            <img className="closet-item-img" src={item.image} alt={item.description}/>
            <h2>{item.type}</h2>
            <h2>"{item.brand}"</h2>
            <h2>Size: {item.size}</h2>
            <h3>{item.description}</h3>
            </li>
        </article>
    )
}

export default Item;