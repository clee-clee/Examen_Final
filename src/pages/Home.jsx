import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Carrusel from '../components/Carrusel';
import TarjetaEpisodio from '../components/TarjetaEpisodio';
import { getAllEpisodes } from '../services/api';

export default function Home({ onLogout }) {
  const [episodios, setEpisodios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAllEpisodes()
      .then(setEpisodios)
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, []);

  // Agrupa por temporada usando el código "S01E01"
  const temporadas = episodios.reduce((acc, ep) => {
    const t = Number(ep.episode.slice(1, 3));
    (acc[t] ||= []).push(ep);
    return acc;
  }, {});

  return (
    <>
      <Navbar onLogout={onLogout} />
      <main>
        <h1>Episodios</h1>
        {cargando && <p className="muted">Cargando…</p>}
        {error && <p className="err">{error}. Revisa tu conexión e intenta de nuevo.</p>}
        {Object.entries(temporadas).map(([t, lista]) => (
          <Carrusel key={t} titulo={`Temporada ${t}`}>
            {lista.map((ep) => <TarjetaEpisodio key={ep.id} episodio={ep} />)}
          </Carrusel>
        ))}
      </main>
    </>
  );
}
