import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PantallaRegistro: React.FC = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [secretQuestion, setSecretQuestion] = useState("");
  const [secretAnswer, setSecretAnswer] = useState("");
  const [devicePin, setDevicePin] = useState(""); // Nuevo estado para devicePin
  const [questions, setQuestions] = useState<{ id: string; pregunta: string }[]>([]);

  const navigate = useNavigate();

  // Obtener las preguntas secretas desde la base de datos
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get<{ id: string; pregunta: string }[]>("https://iot-production-7391.up.railway.app/api/users/secret-questions");
        setQuestions(response.data);
      } catch (error) {
        console.error("Error al obtener las preguntas secretas:", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (password !== value) {
      setPasswordError("Las contraseñas no coinciden");
    } else {
      setPasswordError("");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (!secretQuestion || !secretAnswer) {
      alert("Debes seleccionar una pregunta secreta y proporcionar una respuesta");
      return;
    }

    console.log({
      name,
      lastName,
      surname,
      phone,
      email,
      password,
      secretQuestion,
      secretAnswer,
      devicePin, // Verifica que este campo tenga un valor
    });

    try {
      const response = await axios.post("https://iot-production-7391.up.railway.app/api/users/register", {
        name,
        lastName,
        surname,
        phone,
        email,
        password,
        secretQuestion,
        secretAnswer,
        devicePin, // Envía el campo devicePin
      });

      if (response.status === 201) {
        alert("Usuario registrado exitosamente");
        navigate("/login");
      }
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.message || "Error al registrar el usuario");
      } else {
        alert("Error al conectar con el servidor");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Registrarse</h2>
      <form onSubmit={handleRegister} style={styles.form}>
        <label style={styles.label}>Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ingresa tu nombre"
          required
          style={styles.input}
        />

        <label style={styles.label}>Apellido paterno</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Ingresa tu apellido paterno"
          required
          style={styles.input}
        />

        <label style={styles.label}>Apellido materno</label>
        <input
          type="text"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          placeholder="Ingresa tu apellido materno"
          required
          style={styles.input}
        />

        <label style={styles.label}>Teléfono</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Ingresa tu teléfono"
          required
          style={styles.input}
        />

        <label style={styles.label}>Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ingresa tu correo electrónico"
          required
          style={styles.input}
        />

        <label style={styles.label}>Contraseña</label>
        <div style={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            required
            style={styles.input}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            style={styles.toggleButton}
          >
            {showPassword ? "🙉" : "🙈"}
          </button>
        </div>

        <label style={styles.label}>Confirmar Contraseña</label>
        <div style={styles.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirma tu contraseña"
            required
            style={styles.input}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            style={styles.toggleButton}
          >
            {showPassword ? "🙉" : "🙈"}
          </button>
        </div>
        {passwordError && <p style={styles.error}>{passwordError}</p>}

        <label style={styles.label}>Pregunta secreta</label>
        <select
          value={secretQuestion}
          onChange={(e) => setSecretQuestion(e.target.value)}
          required
          style={styles.input}
        >
          <option value="">Selecciona una pregunta</option>
          {questions.map((q) => (
            <option key={q.id} value={q.pregunta}>
              {q.pregunta}
            </option>
          ))}
        </select>

        <label style={styles.label}>Respuesta</label>
        <input
          type="text"
          value={secretAnswer}
          onChange={(e) => setSecretAnswer(e.target.value)}
          placeholder="Ingresa tu respuesta"
          required
          style={styles.input}
        />

        <label style={styles.label}>PIN del Dispositivo</label>
        <input
          type="text"
          value={devicePin}
          onChange={(e) => setDevicePin(e.target.value)}
          placeholder="Ingresa el PIN del dispositivo"
          
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Registrarse
        </button>
      </form>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "400px",
    padding: "20px",
    borderRadius: "5px",
    backgroundColor: "#fff",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    marginBottom: "40px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "5px",
    textAlign: "left",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
    width: "100%",
  },
  passwordContainer: {
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  toggleButton: {
    position: "absolute",
    right: "10px",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "15px",
    textAlign: "left",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default PantallaRegistro;