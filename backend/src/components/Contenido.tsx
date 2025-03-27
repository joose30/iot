import React, { useState } from "react";

// Define el tipo para las huellas digitales
type Fingerprint = {
  id: number;
  date: string;
};

const Contenido = () => {
  const [fingerprints, setFingerprints] = useState<Fingerprint[]>([]);

  const registerFingerprint = async () => {
    try {
      const response = await fetch(
        "http://192.168.8.6/api/fingerprints/register", //(IPCONFIG)
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: fingerprints.length + 1 }),
        }
      );
      const data = (await response.json()) as Fingerprint; // Asegurar que `data` es de tipo `Fingerprint`
      setFingerprints([...fingerprints, data]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const listFingerprints = async () => {
    try {
      const response = await fetch(
        "http://192.168.8.6/api/fingerprints/list" //(IPCONFIG)
      );
      const data = (await response.json()) as Fingerprint[]; // Asegurar que `data` es de tipo `Fingerprint[]`
      setFingerprints(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={styles.container}>
      <button onClick={registerFingerprint}>Registrar Huella</button>
      <button onClick={listFingerprints}>Listar Huellas</button>
      <ul>
        {fingerprints.map((item, index) => (
          <li key={index} style={styles.fingerprintItem}>
            <span style={styles.fingerprintText}>
              <span style={styles.fingerprintId}>ID: {item.id}</span>
              <span style={styles.fingerprintDate}>
                {" "}
                - {new Date(item.date).toLocaleString()}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
  },
  fingerprintItem: {
    padding: "10px",
    borderBottom: "1px solid #ccc",
    width: "100%",
  },
  fingerprintText: {
    fontSize: "16px",
  },
  fingerprintId: {
    fontWeight: "bold",
  },
  fingerprintDate: {
    color: "#666",
    marginLeft: "8px",
  },
};

export default Contenido;
