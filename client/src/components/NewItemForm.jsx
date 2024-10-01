import { useOutletContext, useNavigate } from "react-router-dom";
import { useState } from "react";

function NewItemForm(){

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        type: "",
        image: "",
        brand: "",
        size: "",
        description: ""
    })

    const {addItem} = useOutletContext()

    function handleSubmit(event){
        event.preventDefault()

        addItem(formData)

        setFormData({
            type: "",
            image: "",
            brand: "",
            size: "",
            description: ""
        })

        navigate('/')
    }

    function updateFormData(event){
        setFormData({...formData, [event.target.name]: event.target.value})
    }

    return (
        <div className="form">
        <form onSubmit={handleSubmit}>
            <h2>Add a new item to My Closet</h2>
            <select onChange={updateFormData} id="type-selection" name="type" value={formData.type} required>
                <option value="" disabled>Select Item Type...</option>
                <option value="Top">Top</option>
                <option value="Bottom">Bottom</option>
            </select>
            <br/><br/>
            <input onChange={updateFormData} placeholder="Image..." type="text" id="image-input" name="image" value={formData.image} required/>
            <br/><br/>
            <input onChange={updateFormData} placeholder="Brand..." type="text" id="brand-input" name="brand" value={formData.brand} required/>
            <br/><br/>
            <input onChange={updateFormData} placeholder="Size..." type="text" id="size-input" name="size" value={formData.size} required/>
            <br/><br/>
            <input onChange={updateFormData} placeholder="Description..." type="text" id="description-input" name="description" value={formData.description} required/>
            <br/><br/>
            <button className="form-button" type="submit">Add To Closet</button>
        </form>
        </div>
    )
}

export default NewItemForm;