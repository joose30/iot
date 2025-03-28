import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/EmpresaInfo.css';

interface Mision {
  id: string;
  contenido: string;
}

interface Vision {
  id: string;
  contenido: string;
}

interface Valor {
  id: string;
  contenido: string;
}

interface Politica {
  id: string;
  descripcion: string;
}

const EmpresaInfo: React.FC = () => {
  const [mision, setMision] = useState<Mision | null>(null);
  const [vision, setVision] = useState<Vision | null>(null);
  const [valor, setValor] = useState<Valor | null>(null);
  const [politica, setPolitica] = useState<Politica | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeSection, setActiveSection] = useState<string | null>(null); // Controla qué sección está abierta

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [misionRes, visionRes, valorRes, politicaRes] = await Promise.all([
          axios.get('https://iot-production-7391.up.railway.app/api/empresa/misions'),
          axios.get('https://iot-production-7391.up.railway.app/api/empresa/visions'),
          axios.get('https://iot-production-7391.up.railway.app/api/empresa/valors'),
          axios.get('https://iot-production-7391.up.railway.app/api/empresa/politicas'),
        ]);

        setMision(misionRes.data as any);
        setVision(visionRes.data as any);
        setValor(valorRes.data as any);
        setPolitica(politicaRes.data as any);
      } catch (err) {
        console.error(err);
        setError('Error al cargar los datos.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>{error}</p>;

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section); // Alterna entre abrir y cerrar
  };

  return (
    <div className="empresa-info">
      <h1>Información de la Empresa</h1>

      <section>
        <h2 onClick={() => toggleSection('mision')} className="accordion-title">
          Misión
        </h2>
        {activeSection === 'mision' && (
          <p className="accordion-content">{mision ? mision.contenido : 'No hay misión disponible'}</p>
        )}
      </section>

      <section>
        <h2 onClick={() => toggleSection('vision')} className="accordion-title">
          Visión
        </h2>
        {activeSection === 'vision' && (
          <p className="accordion-content">{vision ? vision.contenido : 'No hay visión disponible'}</p>
        )}
      </section>

      <section>
        <h2 onClick={() => toggleSection('valor')} className="accordion-title">
          Valores
        </h2>
        {activeSection === 'valor' && (
          <p className="accordion-content">{valor ? valor.contenido : 'No hay valores disponibles'}</p>
        )}
      </section>

      <section>
        <h2 onClick={() => toggleSection('politica')} className="accordion-title">
          Políticas
        </h2>
        {activeSection === 'politica' && (
          <p className="accordion-content">{politica ? politica.descripcion : 'No hay políticas disponibles'}</p>
        )}
      </section>
    </div>
  );
};

export default EmpresaInfo;