import React from "react";

const FooterPublico: React.FC = () => {
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
            Calle Zacatecas, Hospital de Bayes, Helsinga, 43000, México<br />
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=segurixmx@gmail.com&su=Consulta&body=Hola,%20me%20gustaría%20obtener%20más%20información."
              target="_blank"
              rel="noopener noreferrer"
              style={styles.emailLink}
            >
              segurixmx@gmail.com
            </a><br />
            +52 774 545 8510
          </p>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#1E1E1E',
    color: '#FFFFFF',
    padding: '20px',
    textAlign: 'center' as const,
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
  emailLink: {
    color: '#1E90FF', // Azul similar al enlace estándar
    textDecoration: 'none',
    cursor: 'pointer',
    ':hover': {
      textDecoration: 'underline',
    },
  },
};

export default FooterPublico;