import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Mision {
  id: string;
  contenido: string; // Cambiado de descripcion a contenido
}

interface Vision {
  id: string;
  contenido: string; // Cambiado de descripcion a contenido
}

interface Valor {
  id: string;
  contenido: string; // Cambiado de descripcion a contenido
}

interface Politica {
  id: string;
  descripcion: string; // Este permanece igual
}

const EmpresaInfo: React.FC = () => {
  const [mision, setMision] = useState<Mision | null>(null);
  const [vision, setVision] = useState<Vision | null>(null);
  const [valor, setValor] = useState<Valor | null>(null);
  const [politica, setPolitica] = useState<Politica | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [misionRes, visionRes, valorRes, politicaRes] = await Promise.all([
          axios.get('http://localhost:8082/api/empresa/misions'),
          axios.get('http://localhost:8082/api/empresa/visions'),
          axios.get('http://localhost:8082/api/empresa/valors'),
          axios.get('http://localhost:8082/api/empresa/politicas'),
        ]);

        console.log('Misions:', misionRes.data); // Verifica qué datos llegan aquí
        console.log('Visions:', visionRes.data);
        console.log('Valors:', valorRes.data);
        console.log('Politicas:', politicaRes.data);

        setMision(misionRes.data);
        setVision(visionRes.data);
        setValor(valorRes.data);
        setPolitica(politicaRes.data);
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

  return (
    <div>
      <h1>Información de la Empresa</h1>

      <section>
        <h2>Misión</h2>
        <p>{mision ? mision.contenido : 'No hay misión disponible'}</p>
      </section>

      <section>
        <h2>Visión</h2>
        <p>{vision ? vision.contenido : 'No hay visión disponible'}</p>
      </section>

      <section>
        <h2>Valores</h2>
        <p>{valor ? valor.contenido : 'No hay valores disponibles'}</p>
      </section>

      <section>
        <h2>Políticas</h2>
        <p>{politica ? politica.descripcion : 'No hay políticas disponibles'}</p>
      </section>
    </div>
  );
};

export default EmpresaInfo;