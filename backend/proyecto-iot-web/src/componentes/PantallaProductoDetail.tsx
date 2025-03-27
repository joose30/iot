import React from 'react';
import { useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
};

export default function ProductoDetail() {
    const location = useLocation();
    const { addToCart } = useCart();
    const product: Product = location.state?.product;

    if (!product) {
        return <div style={styles.errorContainer}>Producto no encontrado</div>;
    }

    const handleAddToCart = () => {
        addToCart(product);
        alert('Producto agregado al carrito');
    };

    return (
        <div style={styles.screen}>
            <div style={styles.cardContainer}>
                <h1 style={styles.title}>Detalle de {product.name}</h1>
                <img src={product.image} alt={product.name} style={styles.productImage} />
                
                <div style={styles.details}>
                    <div style={styles.detailItem}>
                        <strong style={styles.detailLabel}>Precio:</strong> <span style={styles.detailValue}>${product.price}</span>
                    </div>
                    <div style={styles.detailItem}>
                        <strong style={styles.detailLabel}>Categoría:</strong> <span style={styles.detailValue}>{product.category}</span>
                    </div>
                    <div style={styles.detailItem}>
                        <strong style={styles.detailLabel}>Descripción:</strong> <span style={styles.detailValue}>{product.description || 'Sin descripción disponible.'}</span>
                    </div>
                </div>
                <button style={styles.addToCartButton} onClick={handleAddToCart}>
                    Agregar al carrito
                </button>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    screen: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#F4F7FC',
        padding: '20px',
    },
    cardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: '15px',
        padding: '30px',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
        maxWidth: '900px',
        width: '100%',
        textAlign: 'center',
    },
    title: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#2C3E50',
        marginBottom: '20px',
    },
    productImage: {
        width: '100%',
        maxWidth: '500px',
        height: 'auto',
        borderRadius: '10px',
        marginBottom: '20px',
    },
    details: {
        textAlign: 'left',
        fontSize: '16px',
        color: '#7F8C8D',
    },
    detailItem: {
        marginBottom: '15px',
    },
    detailLabel: {
        fontWeight: 'bold',
        color: '#34495E',
    },
    detailValue: {
        color: '#2C3E50',
        marginLeft: '10px',
    },
    errorContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: '#E74C3C',
        fontSize: '18px',
    },
    addToCartButton: {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#27AE60',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};
