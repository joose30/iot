import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function CheckoutScreen() {
    const { cart, clearCart } = useCart(); // Obtén los datos del carrito y la función para vaciarlo
    const [paymentInfo, setPaymentInfo] = useState({
        name: '',
        cardNumber: '',
        expirationDate: '',
        cvv: '',
    });

    // Calcula el total de productos y el precio total
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPaymentInfo({ ...paymentInfo, [name]: value });
    };

    const handlePayment = () => {
        if (Object.values(paymentInfo).some((field) => field === '')) {
            alert('Por favor, completa todos los campos de pago.');
            return;
        }

        alert('Pago realizado con éxito. ¡Gracias por tu compra!');
        clearCart(); // Vacía el carrito después del pago
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Pantalla de Pago</h1>
            <div style={styles.summary}>
                <h2>Resumen del Pedido</h2>
                <p>Productos: {totalItems}</p>
                <p>Total: ${totalPrice.toFixed(2)}</p>
            </div>
            <div style={styles.paymentForm}>
                <h2>Información de Pago</h2>
                <label style={styles.label}>Nombre en la tarjeta:</label>
                <input
                    type="text"
                    name="name"
                    value={paymentInfo.name}
                    onChange={handleInputChange}
                    style={styles.input}
                />
                <label style={styles.label}>Número de tarjeta:</label>
                <input
                    type="text"
                    name="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={handleInputChange}
                    style={styles.input}
                />
                <label style={styles.label}>Fecha de expiración:</label>
                <input
                    type="text"
                    name="expirationDate"
                    placeholder="MM/AA"
                    value={paymentInfo.expirationDate}
                    onChange={handleInputChange}
                    style={styles.input}
                />
                <label style={styles.label}>CVV:</label>
                <input
                    type="text"
                    name="cvv"
                    value={paymentInfo.cvv}
                    onChange={handleInputChange}
                    style={styles.input}
                />
                <button style={styles.button} onClick={handlePayment}>
                    Confirmar Pago
                </button>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    container: { textAlign: 'center', marginTop: '20px', padding: '20px' },
    title: { fontSize: '28px', marginBottom: '20px' },
    summary: {
        marginBottom: '30px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
        textAlign: 'left',
        maxWidth: '400px',
        margin: '0 auto',
    },
    paymentForm: {
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
        maxWidth: '400px',
        margin: '0 auto',
        textAlign: 'left',
    },
    label: { display: 'block', marginBottom: '5px', fontWeight: 'bold' },
    input: {
        width: '100%',
        padding: '10px',
        marginBottom: '15px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '16px',
    },
    button: {
        backgroundColor: '#2ECC71',
        color: '#FFF',
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        width: '100%',
    },
};