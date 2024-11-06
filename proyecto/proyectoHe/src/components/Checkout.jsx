import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CartContext } from '../context/CartContext';
import '../styles/checkout.css';

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, clearCart } = useContext(CartContext);  // Cart context
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);  // Total price of cart

    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        telefono: '',
        correo: '',
        confirmarCorreo: ''
    });

    const [errors, setErrors] = useState({
        telefono: '',
        confirmarCorreo: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'telefono') {
            const phoneRegex = /^\d+$/;
            setErrors({
                ...errors,
                telefono: phoneRegex.test(value) ? '' : 'Por favor, ingresa solo números.'
            });
        } else if (name === 'confirmarCorreo') {
            setErrors({
                ...errors,
                confirmarCorreo: value === formData.correo ? '' : 'Los correos no coinciden.'
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (errors.telefono || errors.confirmarCorreo || Object.values(formData).some(field => !field)) {
            Swal.fire({
                title: 'Formulario incompleto',
                text: 'Por favor, completa correctamente todos los campos.',
                icon: 'warning',
                confirmButtonText: 'Ok',
            });
            return;
        }

        // Show the order summary to the user
        Swal.fire({
            title: 'Confirmar compra',
            html: `
                <strong>Resumen del pedido:</strong><br>
                <ul>
                    ${cart.map(item => `<li>${item.quantity} x ${item.name} - $${item.price * item.quantity}</li>`).join('')}
                </ul>
                <strong>Total: $${totalPrice}</strong><br>
                <strong>Nombre:</strong> ${formData.nombre} ${formData.apellido}<br>
                <strong>Teléfono:</strong> ${formData.telefono}<br>
                <strong>Correo:</strong> ${formData.correo}`,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: 'Sí, confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Save the order to localStorage (or mock JSON)
                const newOrder = {
                    orderId: new Date().getTime(), // Unique orderId based on timestamp
                    customer: formData,
                    cart,
                    totalPrice,
                    status: 'Confirmed'
                };

                // Store order in localStorage
                const orders = JSON.parse(localStorage.getItem('orders')) || [];
                orders.push(newOrder);
                localStorage.setItem('orders', JSON.stringify(orders));  // Save orders array to localStorage

                // Clear the cart after purchase
                clearCart();

                // Show success message and redirect
                Swal.fire({
                    title: '¡Gracias por tu compra!',
                    text: 'Tu pedido ha sido procesado con éxito.',
                    icon: 'success',
                    confirmButtonText: 'Aceptar',
                }).then(() => {
                    navigate('/'); // Redirect to homepage
                });
            }
        });
    };

    return (
        <div className="checkout-container">
            <h2>Datos del Comprador</h2>
            <form onSubmit={handleSubmit} className="checkout-form">
                <div className="form-group">
                    <label>Nombre:</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Apellido:</label>
                    <input type="text" name="apellido" value={formData.apellido} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Teléfono:</label>
                    <input type="text" name="telefono" value={formData.telefono} onChange={handleInputChange} required />
                    {errors.telefono && <p className="error-text">{errors.telefono}</p>}
                </div>
                <div className="form-group">
                    <label>Correo electrónico:</label>
                    <input type="email" name="correo" value={formData.correo} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Confirmar correo electrónico:</label>
                    <input type="email" name="confirmarCorreo" value={formData.confirmarCorreo} onChange={handleInputChange} required />
                    {errors.confirmarCorreo && <p className="error-text">{errors.confirmarCorreo}</p>}
                </div>
                <button type="submit" className="submit-button">Finalizar Compra</button>
            </form>
        </div>
    );
};

export default Checkout;

