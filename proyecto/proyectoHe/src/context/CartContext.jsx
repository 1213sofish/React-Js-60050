import React, { useState, useEffect, createContext } from 'react';
import Swal from 'sweetalert2';

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

    // Add product to cart
    const addToCart = (product) => {
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
    
        setCart(updatedCart);
    
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
            .filter(item => item.quantity > 0); // Remove if quantity is 0
        saveCartToStorage(updatedCart);
    };

    // Remove product from cart
    const removeFromCart = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        saveCartToStorage(updatedCart);
    };

    // Clear the cart
    const clearCart = () => {
        console.log("Clearing cart"); // Debug log to verify the call
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
};

export default CartContextProvider;


