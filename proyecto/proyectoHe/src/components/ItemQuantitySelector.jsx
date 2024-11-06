import React, { useState } from 'react'

const ItemQuantitySelector = ({ addToCart, product }) => {
    const [quantity, setQuantity] = useState(1);

    const handleChange = (event) => {
        setQuantity(event.target.value);
    };

    const handleAddToCart = () => {
        addToCart({ ...product, quantity: parseInt(quantity) });
    };

    return (
        <div>
            <input 
                type="number" 
                value={quantity} 
                min="1" 
                onChange={handleChange} 
                style={{ width: 50 }} 
            />
            <button onClick={handleAddToCart}>Agregar al carrito</button>
        </div>
    );
}

export default ItemQuantitySelector

