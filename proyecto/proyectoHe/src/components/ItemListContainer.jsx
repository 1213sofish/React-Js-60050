import React, { useEffect, useState } from "react"
import mockProducts from "../assets/mockData.json"
import ItemList from "./ItemList"
import { useParams } from "react-router-dom"
import styles from "../styles/itemListContainer.module.css"

const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    const { categoryId } = useParams();

    useEffect(() => {
        let productsFiltered;
        if (categoryId) {
            productsFiltered = mockProducts.filter(product => product.category.toLowerCase() === categoryId.toLowerCase());
        } else {
            productsFiltered = mockProducts;
        }
        setProducts(productsFiltered);
    }, [categoryId]);

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{categoryId ? `Categoría: ${categoryId}` : 'Todos los productos'}</h1>
            <ItemList products={products} />
        </div>
    );
}

export default ItemListContainer
