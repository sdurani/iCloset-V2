import React, { useEffect, useState } from 'react';
import OutfitCard from './OutfitCard';
import { Outlet } from "react-router-dom";

function MyOutfits() {
    const [outfits, setOutfits] = useState([]);

    useEffect(() => {
        const fetchOutfits = async () => {
            const response = await fetch("/api/my_outfits");
            if (response.ok) {
                const data = await response.json();
                setOutfits(data);
            } else {
                console.error("Failed to fetch outfits");
            }
        };
        fetchOutfits();
    }, []);

    const handleDelete = async (id) => {
        const response = await fetch(`/api/my_outfits/${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
            setOutfits(prevOutfits => prevOutfits.filter(outfit => outfit.id !== id));
        } else {
            console.error("Failed to delete outfit");
        }
    };

    return (
        <div className="closet-container">
            <div className="outfit-grid">
                {outfits.map(outfit => (
                    <OutfitCard key={outfit.id} outfit={outfit} onDelete={handleDelete} />
                ))}
            </div>
            <Outlet context={{
                outfits: outfits,
                setOutfits: setOutfits
            }}/>
        </div>
    );
}

export default MyOutfits;

