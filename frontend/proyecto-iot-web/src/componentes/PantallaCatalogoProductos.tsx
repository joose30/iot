import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
};

export default function PantallaCatalogoProductos() {
    const navigate = useNavigate();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/products/get");
        if (response.status === 200) {
          setProducts(response.data as Product[]);
        }
      } catch (err) {
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };

        fetchProducts();
    }, []);

    const handleProductClick = (product: Product) => {
        navigate(`/productoDetail`, { state: { product } });
    };

    if (loading) {
        return <div style={styles.loadingContainer}>Cargando...</div>;
    }

    if (error) {
        return <div style={styles.errorContainer}>{error}</div>;
    }

    return (
        <div style={styles.screen}>
            <div style={styles.cardContainer}>
                <h2 style={styles.title}>Catálogo de Productos</h2>

                <div style={styles.productList}>
                    {products.map((product) => (
                        <div
                            key={product._id}
                            style={styles.productCard}
                            onClick={() => handleProductClick(product)}
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                style={styles.productImage}
                            />
                            <h3 style={styles.productName}>{product.name}</h3>
                            <p style={styles.productDescription}>{product.description}</p>
                            <div style={styles.detailsContainer}>
                                <span style={styles.priceText}>${product.price.toFixed(2)}</span>
                                <span style={styles.categoryText}>{product.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// 🎨 **Estilos mejorados y adaptados a React**
const styles: { [key: string]: React.CSSProperties } = {
    screen: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#E3EAFD',
        padding: '20px',
    },
    cardContainer: {
        width: '100%',
        maxWidth: '1200px',
        backgroundColor: '#FFFFFF',
        borderRadius: '15px',
        padding: '30px',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.15)',
        textAlign: 'center',
    },
    title: {
        fontSize: '26px',
        fontWeight: 'bold',
        color: '#1E1E1E',
        marginTop: '18px',
    },
    productList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px',
        marginTop: '20px',
    },
    productCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        padding: '15px',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        transition: 'transform 0.2s ease',
    },
    productCardHover: {
        transform: 'scale(1.05)',
    },
    productImage: {
        width: '100%',
        height: '150px',
        objectFit: 'cover',
        borderRadius: '8px',
        marginBottom: '10px',
    },
    productName: {
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '5px',
    },
    productDescription: {
        fontSize: '14px',
        color: '#6c757d',
        marginBottom: '8px',
    },
    detailsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceText: {
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#28a745',
    },
    categoryText: {
        fontSize: '14px',
        color: '#fff',
        backgroundColor: '#007bff',
        borderRadius: '4px',
        padding: '4px 8px',
    },
    loadingContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px',
        fontSize: '18px',
    },
    errorContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100px',
        color: '#dc3545',
        fontSize: '16px',
    },
};
