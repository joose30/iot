import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const arduinoIP = '192.168.8.2'; // Cambia esto por la IP de tu Arduino ESP32

interface FingerprintRegisterResponse {
    success: boolean;
    fingerprintId: string;
    message?: string;
}

interface FingerprintStatusResponse {
    status: 'idle' | 'step1' | 'step2' | 'error' | 'completed';
    message?: string;
}

interface DeviceStatusResponse {
    connected: boolean;
    message?: string;
}

interface FingerprintRegistrationModalProps {
    onCaptureComplete: (accessId: string) => void;
    onCancel: () => void;
    userName: string;
}

const FingerprintRegistrationModal: React.FC<FingerprintRegistrationModalProps> = ({
    onCaptureComplete,
    onCancel,
    userName,
}) => {
    const [status, setStatus] = useState<'idle' | 'registering' | 'success' | 'error' | 'timeout'>('idle');
    const [fingerprintId, setFingerprintId] = useState('');
    const [message, setMessage] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [registrationStep, setRegistrationStep] = useState(0);

    const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        checkDeviceConnection();
        return () => {
            if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const checkDeviceConnection = async () => {
        try {
            const response = await axios.get<DeviceStatusResponse>(`http://${arduinoIP}/api/arduino/status`);
            setIsConnected(response.data.connected);
            if (!response.data.connected) setMessage('Dispositivo IoT desconectado');
        } catch (error) {
            console.error('Error verificando estado del dispositivo:', error);
            setIsConnected(false);
            setMessage('Error al verificar estado del dispositivo');
        }
    };

    const startFingerprintRegistration = async () => {
        if (!isConnected) {
            setMessage('Dispositivo IoT no conectado');
            return;
        }

        setIsRegistering(true);
        setStatus('registering');
        setMessage('Coloque su dedo en el sensor de huella...');
        setRegistrationStep(1);

        try {
            const response = await axios.post<FingerprintRegisterResponse>(
                `http://${arduinoIP}/api/arduino/fingerprint/register`,
                { userName }
            );

            const newFingerprintId = response.data.fingerprintId;

            pollIntervalRef.current = setInterval(async () => {
                try {
                    const pollResponse = await axios.get<FingerprintStatusResponse>(
                        `http://${arduinoIP}/api/arduino/fingerprint/status`
                    );

                    const registrationStatus = pollResponse.data.status;

                    if (registrationStatus === 'step1') {
                        setMessage('Primera captura completada. Retire su dedo.');
                        setRegistrationStep(2);
                    } else if (registrationStatus === 'step2') {
                        setMessage('Vuelva a colocar su dedo para confirmar...');
                        setRegistrationStep(3);
                    } else if (registrationStatus === 'completed') {
                        clearInterval(pollIntervalRef.current!);
                        setFingerprintId(newFingerprintId);
                        setStatus('success');
                        setMessage(`Huella registrada correctamente con ID: ${newFingerprintId}`);
                        setIsRegistering(false);
                        setTimeout(() => onCaptureComplete(newFingerprintId), 2000);
                    } else if (registrationStatus === 'error') {
                        clearInterval(pollIntervalRef.current!);
                        setStatus('error');
                        setMessage(pollResponse.data.message || 'Error desconocido');
                        setIsRegistering(false);
                    }
                } catch (pollError) {
                    console.error('Error al verificar estado del registro:', pollError);
                    setMessage('Error al verificar estado. Reintentando...');
                }
            }, 1000);

            timeoutRef.current = setTimeout(() => {
                clearInterval(pollIntervalRef.current!);
                setStatus('timeout');
                setMessage('Tiempo de espera agotado. Intente nuevamente.');
                setIsRegistering(false);
            }, 60000);
        } catch (error) {
            console.error('Error al iniciar registro de huella:', error);
            setStatus('error');
            setMessage('Error al comunicarse con el dispositivo');
            setIsRegistering(false);
        }
    };

    const handleCancel = () => {
        if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsRegistering(false);
        setStatus('idle');
        setMessage('');
        onCancel();
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Registro de Huella Digital</h1>
            <p style={styles.message}>{message}</p>
            {isRegistering && <div style={styles.loader}>Cargando...</div>}
            <div style={styles.buttonContainer}>
                {!isRegistering ? (
                    <>
                        <button
                            style={{ ...styles.button, ...styles.primaryButton }}
                            onClick={startFingerprintRegistration}
                            disabled={!isConnected}
                        >
                            Registrar Huella
                        </button>
                        <button style={{ ...styles.button, ...styles.cancelButton }} onClick={handleCancel}>
                            Cancelar
                        </button>
                    </>
                ) : (
                    <button style={{ ...styles.button, ...styles.cancelButton }} onClick={handleCancel}>
                        Cancelar Registro
                    </button>
                )}
            </div>
        </div>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: '20px',
        textAlign: 'center',
    },
    title: {
        fontSize: '22px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    message: {
        marginBottom: '20px',
        fontSize: '16px',
    },
    loader: {
        margin: '20px 0',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
    },
    button: {
        padding: '10px 20px',
        borderRadius: '5px',
        fontSize: '16px',
        cursor: 'pointer',
    },
    primaryButton: {
        backgroundColor: '#007bff',
        color: '#fff',
    },
    cancelButton: {
        backgroundColor: '#6c757d',
        color: '#fff',
    },
};

export default FingerprintRegistrationModal;