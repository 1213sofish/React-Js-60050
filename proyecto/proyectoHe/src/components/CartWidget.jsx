import React from 'react'
import cart from '../assets/cart.svg'
import 'bootstrap/dist/css/bootstrap.min.css'

const CartWidget = () => {
    const cartItems = 5;
    return (
    <img src={cart} alt="cart" style={{ width: 40 }} />
    )
}

export default CartWidget