import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartScreen() {
    const { cart, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();

    const handleCheckout = () => {
        // Redirige a la pantalla de pago
        navigate('/checkout');
    };

    if (cart.length === 0) {
        return <div style={styles.emptyCart}>El carrito está vacío</div>;
    }

    return (
        <div style={styles.cartContainer}>
            <h1 style={styles.title}>Carrito de Compras</h1>
            <ul style={styles.cartList}>
                {cart.map((item) => (
                    <li key={item.product._id} style={styles.cartItem}>
                        <img src={item.product.image} alt={item.product.name} style={styles.productImage} />
                        <div>
                            <h2>{item.product.name}</h2>
                            <p>Precio: ${item.product.price}</p>
                            <p>Cantidad: {item.quantity}</p>
                            <button onClick={() => removeFromCart(item.product._id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
            <button onClick={clearCart} style={styles.clearCartButton}>Vaciar carrito</button>
            <button onClick={handleCheckout} style={styles.checkoutButton}>Realizar compra</button>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    cartContainer: { padding: '20px' },
    title: { fontSize: '24px', marginBottom: '20px' },
    cartList: { listStyle: 'none', padding: 0 },
    cartItem: { display: 'flex', marginBottom: '20px' },
    productImage: { width: '100px', height: '100px', marginRight: '20px' },
    clearCartButton: { backgroundColor: '#E74C3C', color: '#FFF', padding: '10px', border: 'none', cursor: 'pointer' },
    checkoutButton: { backgroundColor: '#2ECC71', color: '#FFF', padding: '10px', border: 'none', cursor: 'pointer', marginLeft: '10px' },
    emptyCart: { textAlign: 'center', marginTop: '50px', fontSize: '18px' },
};