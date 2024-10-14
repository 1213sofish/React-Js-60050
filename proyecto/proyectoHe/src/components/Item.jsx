import React from "react"
import { Link } from "react-router-dom"
import styles from "../styles/item.module.css"

const Item = ({ item }) => {
    return (
        <div className={styles.item}>
            <Link to={`/item/${item.id}`}>
                <h3>{item.name}</h3>
                <img src={item.pictureUrl} alt={item.name} />
                <p>Precio: ${item.price}</p>
            </Link>
        </div>
    );
}

export default Item


