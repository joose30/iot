import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Cambia useRouter por useNavigate

export default function RFIDControlScreen() {
    const [rfidUID, setRfidUID] = useState<string | null>(null);
    const [accessGranted, setAccessGranted] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Usa useNavigate en lugar de useRouter

    const ESP32_IP = "http://192.168.8.8"; // Cambia por la IP real de tu ESP32

    const handleScanRFID = async () => {
        setLoading(true);
        setRfidUID(null); // Limpiar el UID anterior
        setAccessGranted(null); // Limpiar el estado de acceso anterior

        try {
            const response = await fetch(`${ESP32_IP}/leerRFID`);
            const text = await response.text();

            if (response.status === 200) {
                setRfidUID(text);
                // Aquí puedes agregar lógica para validar si el UID es permitido
                const isUIDValid = true; // Cambia esto según tu lógica de validación
                setAccessGranted(isUIDValid);

                if (isUIDValid) {
                    alert(`Acceso Concedido\nUID: ${text}`);
                } else {
                    alert(`Acceso Denegado\nUID: ${text} no está autorizado.`);
                }
            } else {
                setRfidUID("No se detectó tarjeta");
                setAccessGranted(false);
                alert("Error: No se detectó ninguna tarjeta RFID.");
            }
        } catch (error) {
            console.error("Error al leer RFID:", error);
            setRfidUID("Error de conexión");
            setAccessGranted(false);
            alert("Error: No se pudo conectar al servidor.");
        } finally {
            setLoading(false);
        }
    };

    const handleReturn = () => {
        navigate('/'); // Usa navigate para redirigir
    };

    return (
        <div style={styles.screen}>
            <div style={styles.cardContainer}>
                <div style={styles.topBar}>
                    <button onClick={handleReturn} style={styles.backButton}>
                        ←
                    </button>
                </div>

                <div style={styles.contentContainer}>
                    <h2 style={styles.title}>Control RFID</h2>

                    {loading ? (
                        <div style={styles.loader}>Cargando...</div>
                    ) : rfidUID ? (
                        <>
                            <p style={styles.uidText}>UID: {rfidUID}</p>
                            {accessGranted ? (
                                <p style={styles.accessGranted}>Acceso Concedido</p>
                            ) : (
                                <p style={styles.accessDenied}>Acceso Denegado</p>
                            )}
                        </>
                    ) : (
                        <p style={styles.promptText}>Presiona el botón para leer RFID</p>
                    )}

                    <button
                        style={styles.scanButton}
                        onClick={handleScanRFID}
                        disabled={loading}
                    >
                        {loading ? "Leyendo..." : "Leer RFID"}
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
        backgroundColor: '#CFE2FF',
        minHeight: '100vh',
        padding: '20px',
    },
    cardContainer: {
        width: '90%',
        maxWidth: '500px',
        backgroundColor: '#FFFFFF',
        borderRadius: '15px',
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    },
    topBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #E0E0E0',
        marginBottom: '20px',
        paddingBottom: '10px',
    },
    logo: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#1E1E1E',
    },
    backButton: {
        fontSize: '24px',
        color: '#1E1E1E',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
    },
    contentContainer: {
        textAlign: 'center',
    },
    title: {
        fontSize: '22px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#1E1E1E',
    },
    promptText: {
        fontSize: '16px',
        color: '#1E1E1E',
        marginBottom: '20px',
    },
    uidText: {
        fontSize: '18px',
        color: '#1E1E1E',
        marginBottom: '10px',
    },
    accessGranted: {
        fontSize: '20px',
        color: 'green',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    accessDenied: {
        fontSize: '20px',
        color: 'red',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    scanButton: {
        backgroundColor: '#1E1E1E',
        borderRadius: '10px',
        padding: '12px 20px',
        color: '#FFFFFF',
        fontSize: '16px',
        fontWeight: '600',
        border: 'none',
        cursor: 'pointer',
        marginTop: '10px',
    },
    loader: {
        fontSize: '18px',
        color: '#1E1E1E',
    },
};