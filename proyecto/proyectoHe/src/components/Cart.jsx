import React, { useContext } from "react"
import { CartContext } from '../context/CartContext'
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../styles/cart.css'

const Cart = () => {
    const { cart, removeFromCart, clearCart, updateCartQuantity } = useContext(CartContext);
    const navigate = useNavigate();

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const handleCheckout = () => {
        if (cart.length === 0) {
            Swal.fire({
                title: 'Carrito vacío',
                text: 'Agrega productos a tu carrito antes de proceder.',
                icon: 'warning',
                confirmButtonText: 'Ok',
            });
        } else {
            navigate('/checkout');
        }
    };

    return (
        <div className="cart-container">
            <h2>Tu carrito</h2>
            {cart.length === 0 ? (
                <p className="empty-cart">Tu carrito está vacío</p>
            ) : (
                <div>
                    <ul>
                        {cart.map((item, index) => (
                            <li key={index} className="cart-item">
                                <div>
                                    {/* Link to ItemDetail page */}
                                    <h4><Link to={`/item/${item.id}`}>{item.name}</Link></h4>
                                    <p>Precio: ${item.price}</p>
                                </div>
                                <div className="actions">
                                    <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)}>-</button>
                                    <span style={{ margin: '0 8px' }}>Cantidad: {item.quantity}</span>
                                    <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)}>+</button>
                                    <button onClick={() => removeFromCart(index)}>Eliminar</button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className="cart-total">
                        <p>Precio total: ${totalPrice}</p>
                        <button onClick={handleCheckout}>Proceder a pagar</button>
                        <button className="cart-clear-btn" onClick={() => clearCart()}>Vaciar carrito</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Cart

