import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import '../styles/orderConfirmation.css';

const OrderConfirmation = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            const orderRef = doc(db, "orders", orderId);
            const orderSnap = await getDoc(orderRef);
            if (orderSnap.exists()) {
                setOrder(orderSnap.data());
            } else {
                console.error("Order not found");
            }
        };

        fetchOrder();
    }, [orderId]);

    return (
        <div className="order-confirmation-container">
            {order ? (
                <div>
                    <h2>Confirmación de Pedido</h2>
                    <p><strong>Pedido ID:</strong> {orderId}</p>
                    <p><strong>Estado:</strong> {order.status}</p>
                    <p><strong>Total:</strong> ${order.totalPrice}</p>
                    <ul>
                        {order.items.map((item, index) => (
                            <li key={index}>
                                {item.name} - ${item.price} x {item.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default OrderConfirmation;
