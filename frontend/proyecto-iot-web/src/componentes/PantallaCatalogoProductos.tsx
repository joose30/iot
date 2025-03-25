import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

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
  const [categories, setCategories] = useState<string[]>([]); // Lista de categorías
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // Categoría seleccionada
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const productsPerPage = 9; // Número de productos por página

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

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8082/api/products/categories");
        if (response.status === 200) {
          setCategories(response.data as string[]);
        }
      } catch (err) {
        console.error("Error al cargar las categorías:", err);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleProductClick = (product: Product) => {
    navigate(`/productoDetail`, { state: { product } });
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredProducts.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
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

        <div style={styles.filterContainer}>
          <label style={styles.filterLabel}>Categoría:</label>
          <select
            style={styles.filterSelect}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.productList}>
          {currentProducts.map((product) => (
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

        <div style={styles.paginationContainer}>
          <button
            style={styles.paginationButton}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span style={styles.paginationInfo}>
            Página {currentPage} de {Math.ceil(filteredProducts.length / productsPerPage)}
          </span>
          <button
            style={styles.paginationButton}
            onClick={handleNextPage}
            disabled={currentPage === Math.ceil(filteredProducts.length / productsPerPage)}
          >
            Siguiente
          </button>
        </div>

        <Link to="/carrito" style={{ textDecoration: 'none', color: '#27AE60' }}>
          Ver Carrito
        </Link>
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
  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
    gap: '10px',
  },
  filterLabel: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  filterSelect: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
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
  paginationContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
    gap: '10px',
  },
  paginationButton: {
    padding: '10px 15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  paginationInfo: {
    fontSize: '16px',
    fontWeight: 'bold',
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
