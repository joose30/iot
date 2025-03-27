import React, { useState } from 'react';
import axios from 'axios';

const RegistrarHuella: React.FC = () => {
    const [message, setMessage] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleRegister = async () => {
        try {
            setIsRegistering(true); // Indica que el registro está en proceso
            setMessage('Coloque su dedo en el sensor de huella...');

            // Llama a la API para iniciar el registro de la huella
            const token = localStorage.getItem('token'); // Obtén el token del usuario
            const response = await axios.get(
                'http://localhost:8082/api/huella/registrar', // URL del backend
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Envía el token en el encabezado
                    },
                }
            );

            // Muestra el mensaje de éxito recibido del backend
            setMessage(response.data || 'Huella registrada correctamente.');
        } catch (error: any) {
            console.error('Error al registrar huella:', error);
            setMessage('Error al registrar la huella.');
        } finally {
            setIsRegistering(false); // Finaliza el proceso de registro
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Registrar Huella</h1>
            <button
                onClick={handleRegister}
                style={isRegistering ? styles.buttonDisabled : styles.button}
                disabled={isRegistering} // Deshabilita el botón mientras se registra
            >
                {isRegistering ? 'Registrando...' : 'Registrar Huella'}
            </button>
            {message && <p style={styles.message}>{message}</p>}
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4',
        padding: '20px',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#333',
    },
    button: {
        backgroundColor: '#2ECC71',
        color: '#FFF',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    buttonDisabled: {
        backgroundColor: '#ccc',
        color: '#666',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '4px',
        fontSize: '16px',
        cursor: 'not-allowed',
    },
    message: {
        marginTop: '15px',
        fontSize: '16px',
        color: '#333',
    },
};

export default RegistrarHuella;