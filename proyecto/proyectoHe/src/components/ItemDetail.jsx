import React, { useContext } from 'react'
import styles from "../styles/itemDetail.module.css"
import { CartContext } from "../context/CartContext"

const ItemDetail = ({ product }) => {
    const { addToCart } = useContext(CartContext)
    if (!product) return <p>Loading...</p>;

    const handleAddToCart = () => {
        addToCart(product);  
    };
    
    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <img src={product.pictureUrl} alt={product.name} className={styles.image} />
            </div>
            <div className={styles.details}>
                <h2 className={styles.title}>{product.name}</h2>
                <p className={styles.price}>Precio: ${product.price}</p>
                <p className={styles.description}>Descripción: {product.description}</p>
                <button className={styles.button}onClick={handleAddToCart}>Agregar al Carrito</button>
            </div>
        </div>
    );
}

export default ItemDetail

