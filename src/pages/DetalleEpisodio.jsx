import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TarjetaPersonaje from '../components/TarjetaPersonaje';
import { getEpisodeById, getMultipleCharacters } from '../services/api';

export default function DetalleEpisodio({ onLogout }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [episodio, setEpisodio] = useState(null);
  const [personajes, setPersonajes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setEpisodio(null);
    getEpisodeById(id)
      .then(async (ep) => {
        setEpisodio(ep);
        setPersonajes(await getMultipleCharacters(ep.characters));
      })
      .catch((e) => setError(e.message));
  }, [id]);

  return (
    <>
      <Navbar onLogout={onLogout} />
      <main>
        <button className="volver" onClick={() => navigate(-1)}>‹ Volver</button>
        {error && <p className="err">{error}. Revisa tu conexión e intenta de nuevo.</p>}
        {!episodio && !error && <p className="muted">Cargando…</p>}
        {episodio && (
          <>
            <section className="banner">
              <h1>{episodio.name}</h1>
              <p>
                <span className="etiqueta">{episodio.episode}</span>{' '}
                <span className="muted">Estreno: {episodio.air_date}</span>
              </p>
            </section>
            <h2>Personajes del episodio</h2>
            <div className="cuadricula">
              {personajes.map((p) => <TarjetaPersonaje key={p.id} personaje={p} />)}
            </div>
          </>
        )}
      </main>
    </>
  );
}
