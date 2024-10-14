import React from "react"
import styles from "../styles/itemDetail.module.css"

const ItemDetail = ({ product }) => {
    if (!product) return <p>Loading...</p>;

    return (
        <div className={styles.container}>
            <div className={styles.imageContainer}>
                <img src={product.pictureUrl} alt={product.name} className={styles.image} />
            </div>
            <div className={styles.details}>
                <h2 className={styles.title}>{product.name}</h2>
                <p className={styles.price}>Precio: ${product.price}</p>
                <p className={styles.description}>Descripción: {product.description}</p>
                <button className={styles.button}>Agregar al Carrito</button>
            </div>
        </div>
    );
}

export default ItemDetail

