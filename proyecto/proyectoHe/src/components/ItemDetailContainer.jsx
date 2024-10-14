import React, { useEffect, useState } from "react"
import products from "../assets/mockData.json"
import ItemDetail from "./ItemDetail"
import { useParams } from "react-router-dom"

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null);
    const { itemId } = useParams();

    useEffect(() => {
        const productFound = products.find(product => product.id.toString() === itemId);
        setProduct(productFound);
    }, [itemId]);

    if (!product) {
        return <div>Cargando...</div>;
    }

    return <ItemDetail product={product} />;
}

export default ItemDetailContainer

