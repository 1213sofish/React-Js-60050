import React, { useEffect, useState } from 'react';
import Item from '../components/Item';

const ProductList = () => {
    var [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('productos.json')
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error('Error al cargar los productos:', error));
    }, []);

    return (
        <div id="productosContainer">
        {products.map((item, index) => (
            <Item key={index} item={item} />
        ))}
        </div>
    );
};

export default ProductList;
