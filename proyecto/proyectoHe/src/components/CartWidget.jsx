import React, { useContext } from "react";
import cartIcon from '../assets/cart.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartContext } from '../context/CartContext';

const CartWidget = () => {
    const { cart, removeFromCart, clearCart, addToCart } = useContext(CartContext);
    return (
        <div>
            <img src={cartIcon} alt="cart" style={{ width: 30 }} />
            <span style={{ color: 'white', marginLeft: 8 }}>{cart.length}</span>
        </div>
    );
};

export default CartWidget;
