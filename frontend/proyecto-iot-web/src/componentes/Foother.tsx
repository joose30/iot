import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.footerContent}>
                <div style={styles.footerSection}>
                    <h3 style={styles.footerTitle}>Términos y condiciones</h3>
                    <p style={styles.footerText}>
                        Consulta nuestros términos y condiciones para más información.
                    </p>
                </div>
                <div style={styles.footerSection}>
                    <h3 style={styles.footerTitle}>Privacidad</h3>
                    <p style={styles.footerText}>
                        Respetamos tu privacidad. Conoce nuestra política de privacidad.
                    </p>
                </div>
                <div style={styles.footerSection}>
                    <h3 style={styles.footerTitle}>CONTÁCTANOS</h3>
                    <p style={styles.footerText}>
                        Col. Horacio Camargo<br />
                        segurix@mail.com<br />
                        +52 774 545 8510
                    </p>
                </div>
            </div>
        </footer>
    );
};

const styles: { [key: string]: React.CSSProperties } = {
    footer: {
        backgroundColor: '#1E1E1E',
        color: '#FFFFFF',
        padding: '20px',
        textAlign: 'center',
    },
    footerContent: {
        display: 'flex',
        justifyContent: 'space-around',
        maxWidth: '1200px',
        margin: '0 auto',
    },
    footerSection: {
        flex: 1,
        margin: '0 10px',
    },
    footerTitle: {
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    footerText: {
        fontSize: '14px',
        margin: 0,
    },
};

export default Footer;