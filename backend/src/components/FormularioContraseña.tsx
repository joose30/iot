import React, { useState } from 'react';

const PasswordForm = () => {
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
        const response = await fetch('http://192.168.8.6:8082/api/passwords/register', { //(IPCONFIG)
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        });

        if (response.ok) {
            alert('Contraseña registrada correctamente');
            setPassword('');
        } else {
            alert('Error al registrar la contraseña');
        }
        } catch (error) {
        console.error('Error:', error);
        }
    };

    return (
        <div style={styles.container}>
        <h2>Registrar Contraseña</h2>
        <form onSubmit={handleSubmit}>
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa la contraseña"
            required
            style={styles.input}
            />
            <button type="submit" style={styles.button}>
            Registrar
            </button>
        </form>
        </div>
    );
    };

    // Estilos mejorados
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
        padding: '20px',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column' as 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
    },
    input: {
        padding: '12px',
        margin: '10px 0',
        width: '100%',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        outline: 'none',
        transition: 'border-color 0.3s ease',
    },
    button: {
        padding: '12px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        width: '100%',
        marginTop: '10px',
        transition: 'background-color 0.3s ease',
    },
};

export default PasswordForm;