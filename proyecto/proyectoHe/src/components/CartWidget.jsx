import React from 'react'
import cart from '../assets/cart.svg'
import 'bootstrap/dist/css/bootstrap.min.css'

const CartWidget = () => {
    const cartItems = 5;
    return (
        <div>
            <img src={cart} alt="cart" style={{ width: 30 }} />
            <span style={{ color: 'white', marginLeft: 8 }}>{cartItems}</span>
        </div>
    )
}

export default CartWidget