import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../firebase/config"
import { collection, query, where, getDocs } from "firebase/firestore"
import ItemList from "./ItemList"
import styles from "../styles/itemListContainer.module.css"

const ItemListContainer = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { categoryId } = useParams();  

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true); 
                let productsFiltered = [];
                if (categoryId) { 
                    const q = query(
                        collection(db, "products"),
                        where("category", "==", categoryId)
                    );
                    const querySnapshot = await getDocs(q);
                    querySnapshot.forEach((doc) => {
                        productsFiltered.push({ id: doc.id, ...doc.data() });
                    });
                } else { 
                    const querySnapshot = await getDocs(collection(db, "products"));
                    querySnapshot.forEach((doc) => {
                        productsFiltered.push({ id: doc.id, ...doc.data() });
                    });
                }
                setProducts(productsFiltered);  
                setLoading(false);  
            } catch (error) {
                setError("Error al cargar los productos.");
                console.error("Error fetching products: ", error);
                setLoading(false);  
            }
        };

        fetchProducts();
    }, [categoryId]);  

    if (loading) {
        return <div className={styles.loading}>Cargando productos...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                {categoryId ? `Categoría: ${categoryId}` : 'Todos los productos'}
            </h1>
            <ItemList products={products} />
        </div>
    );
}

export default ItemListContainer

