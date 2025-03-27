import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Props = {
    userId: string;
};

export default function PantallaPerfil({ userId }: Props) {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await axios.get(`http://iot-production-7391.up.railway.app/api/users/${userId}`); // (IPCONFIG)
            const user: any = response.data;
            setName(user.name);
            setLastName(user.lastName);
            setSurname(user.surname);
            setPhone(user.phone);
            setEmail(user.email);
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
        }
    };

    const handleSubmit = async () => {
        const updateData: any = {
            name,
            lastName,
            surname,
            phone,
            email,
        };

        if (password) {
            updateData.password = password;
        }

        try {
            const response = await axios.put(`http://iot-production-7391.up.railway.app/api/users/update/${userId}`, updateData); // (IPCONFIG)
            if (response.status === 200) {
                alert('Éxito: Datos actualizados correctamente');
                setPassword('');
            }
        } catch (error) {
            alert('Error: No se pudo actualizar la información');
            console.error('Error al actualizar:', error);
        }
    };

    return (
        <div style={styles.screen}>
            <div style={styles.cardContainer}>
                <div style={styles.topBar}>
                    <h1 style={styles.logo}>Mi Perfil</h1>
                </div>
                <div style={styles.contentContainer}>
                    <div style={styles.icon}>👤</div>

                    <label style={styles.label}>Nombre</label>
                    <input
                        type="text"
                        style={styles.input}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <label style={styles.label}>Apellido paterno</label>
                    <input
                        type="text"
                        style={styles.input}
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                    <label style={styles.label}>Apellido materno</label>
                    <input
                        type="text"
                        style={styles.input}
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />

                    <label style={styles.label}>Teléfono</label>
                    <input
                        type="text"
                        style={styles.input}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <label style={styles.label}>Correo electrónico</label>
                    <input
                        type="email"
                        style={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label style={styles.label}>Nueva Contraseña</label>
                    <input
                        type="password"
                        style={styles.input}
                        placeholder="Dejar en blanco para no cambiar"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button style={styles.button} onClick={handleSubmit}>
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    );
}

const styles: { [key: string]: React.CSSProperties } = {
    screen: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
        padding: '20px',
    },
    cardContainer: {
        width: '90%',
        maxWidth: '500px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    topBar: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    logo: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    contentContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    icon: {
        fontSize: '80px',
        marginBottom: '20px',
    },
    label: {
        alignSelf: 'flex-start',
        fontSize: '16px',
        marginBottom: '5px',
    },
    input: {
        width: '100%',
        height: '40px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        marginBottom: '15px',
        padding: '0 10px',
    },
    button: {
        width: '100%',
        height: '50px',
        backgroundColor: '#007bff',
        color: '#fff',
        fontSize: '18px',
        fontWeight: 'bold',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};