import React, { useState, useEffect, createContext } from 'react'
import Swal from 'sweetalert2'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    
    // Load cart from local storage
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to local storage
    const saveCartToStorage = (newCart) => {
        localStorage.setItem('cart', JSON.stringify(newCart));
        setCart(newCart);
    };

    // Add product to cart from Firebase
    const addToCart = (product) => {
        if (!product || !product.id) {
            console.error("Invalid product data:", product);
            return;
        }
        
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        let updatedCart;
    
        if (existingProductIndex >= 0) {
            updatedCart = cart.map((item) =>
                item.id === product.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            updatedCart = [...cart, { ...product, quantity: 1 }];
        }
    
        saveCartToStorage(updatedCart);
        
        Swal.fire({
            icon: 'success',
            title: 'Producto agregado',
            text: `${product.name} ha sido agregado al carrito`,
            showConfirmButton: false,
            timer: 1500
        });
    };

    // Update product quantity
    const updateCartQuantity = (productId, newQuantity) => {
        const updatedCart = cart
            .map(item =>
                item.id === productId ? { ...item, quantity: newQuantity } : item
            )
            .filter(item => item.quantity > 0); 
        saveCartToStorage(updatedCart);
    };

    // Remove product from cart
    const removeFromCart = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        saveCartToStorage(updatedCart);
    };

    // Clear the cart
    const clearCart = () => {
        setCart([]);
        saveCartToStorage([]);
        Swal.fire({
            icon: 'warning',
            title: 'Carrito vaciado',
            text: 'Todos los productos fueron removidos del carrito',
            showConfirmButton: false,
            timer: 1500
        });
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateCartQuantity, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContextProvider



