import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Panel de Administración</h1>
      <p style={styles.subtitle}>Bienvenido, administrador.</p>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", fontFamily: "Arial, sans-serif", textAlign: "center" as "center" },
  title: { fontSize: "32px", fontWeight: "bold", marginBottom: "20px" },
  subtitle: { fontSize: "18px", color: "#555" },
};

export default AdminDashboard;