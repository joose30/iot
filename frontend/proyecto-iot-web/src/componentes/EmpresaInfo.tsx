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
  const [misions, setMisions] = useState<Mision[]>([]);
  const [visions, setVisions] = useState<Vision[]>([]);
  const [valors, setValors] = useState<Valor[]>([]);
  const [politicas, setPoliticas] = useState<Politica[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [misionsRes, visionsRes, valorsRes, politicasRes] = await Promise.all([
          axios.get('http://localhost:8082/api/empresa/misions'),
          axios.get('http://localhost:8082/api/empresa/visions'),
          axios.get('http://localhost:8082/api/empresa/valors'),
          axios.get('http://localhost:8082/api/empresa/politicas'),
        ]);

        setMisions(misionsRes.data);
        setVisions(visionsRes.data);
        setValors(valorsRes.data);
        setPoliticas(politicasRes.data);
      } catch (err) {
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
        <ul>
          {misions.map((mision) => (
            <li key={mision.id}>{mision.contenido}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Visión</h2>
        <ul>
          {visions.map((vision) => (
            <li key={vision.id}>{vision.contenido}</li> 
          ))}
        </ul>
      </section>

      <section>
        <h2>Valores</h2>
        <ul>
          {valors.map((valor) => (
            <li key={valor.id}>{valor.contenido}</li> 
          ))}
        </ul>
      </section>

      <section>
        <h2>Políticas</h2>
        <ul>
          {politicas.map((politica) => (
            <li key={politica.id}>{politica.descripcion}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default EmpresaInfo;