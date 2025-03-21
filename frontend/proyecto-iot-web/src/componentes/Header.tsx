import React from 'react';
import { Link } from 'react-router-dom'; // Si usas react-router-dom para la navegación

const Header: React.FC = () => {
    return (
        <header style={styles.header}>
            <nav style={styles.nav}>
                {/* SEGURIX a la izquierda */}
                <h1 style={styles.brand}>SEGURIX</h1>

                {/* Contenedor de enlaces centrados */}
                <ul style={styles.navList}>
                    <li style={styles.navItem}>
                        <Link to="/empresa" style={styles.navLink}>Empresa</Link>
                    </li>
                    <li style={styles.navItem}>
                        <Link to="/productos" style={styles.navLink}>Productos</Link>
                    </li>
                    <li style={styles.navItem}>
                        <Link to="/huella" style={styles.navLink}>Huella</Link>
                    </li>
                    <li style={styles.navItem}>
                        <Link to="/dispositivo" style={styles.navLink}>Dispositivo IoT</Link>
                    </li>
                    <li style={styles.navItem}>
                        <Link to="/rfid" style={styles.navLink}>RFID</Link>
                    </li>
                    <li style={styles.navItem}>
                        <Link to="/perfil" style={styles.navLink}>Perfil</Link>
                    </li>
                    <li style={styles.navItem}>
                        <Link to="/admin-productos" style={styles.navLink}>Admin (agg prod)</Link>
                    </li>
                    <li style={styles.navItem}>
                        <Link to="/admin-empresa" style={styles.navLink}>Admin (datos empresa)</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    header: {
        backgroundColor: '#1E1E1E',
        padding: '10px 20px',
        color: '#FFFFFF',
    },
    nav: {
        display: 'flex',
        alignItems: 'center', // Alinea verticalmente SEGURIX y los enlaces
    },
    brand: {
        fontSize: '24px', // Tamaño grande para resaltar
        fontWeight: 'bold', // Texto en negrita
        margin: 0, // Elimina el margen por defecto
        color: '#FFFFFF', // Color blanco
        marginRight: 'auto', // Mueve SEGURIX a la izquierda
    },
    navList: {
        listStyle: 'none',
        display: 'flex',
        gap: '20px',
        margin: 0,
        padding: 0,
        position: 'absolute', // Posiciona los enlaces de manera absoluta
        left: '50%', // Centra los enlaces
        transform: 'translateX(-50%)', // Ajusta el centrado
    },
    navItem: {
        margin: 0,
    },
    navLink: {
        color: '#FFFFFF',
        textDecoration: 'none',
        fontSize: '16px',
        fontWeight: 'bold',
    },
};

export default Header;