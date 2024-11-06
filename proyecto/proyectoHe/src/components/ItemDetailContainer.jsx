import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/config"
import ItemDetail from "./ItemDetail"
import styles from "../styles/itemDetailContainer.module.css"

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { itemId } = useParams(); 

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const docRef = doc(db, "products", itemId); 
                const docSnap = await getDoc(docRef); 

                if (docSnap.exists()) {
                    setProduct({ id: docSnap.id, ...docSnap.data() });
                } else {
                    setError("Producto no encontrado.");
                }
            } catch (error) {
                setError("Error al cargar el producto. Intenta nuevamente.");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [itemId]);

    if (loading) {
        return <div className={styles.loading}>Cargando detalles del producto...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return product && <ItemDetail product={product} />;
}

export default ItemDetailContainer

