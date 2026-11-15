import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getCharacterById } from '../services/api';

const ESTADOS = { Alive: 'Vivo', Dead: 'Muerto', unknown: 'Desconocido' };

export default function DetallePersonaje({ onLogout }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [personaje, setPersonaje] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setPersonaje(null);
    getCharacterById(id)
      .then(setPersonaje)
      .catch((e) => setError(e.message));
  }, [id]);

  return (
    <>
      <Navbar onLogout={onLogout} />
      <main>
        <button className="volver" onClick={() => navigate(-1)}>‹ Volver</button>
        {error && <p className="err">{error}. Revisa tu conexión e intenta de nuevo.</p>}
        {!personaje && !error && <p className="muted">Cargando…</p>}
        {personaje && (
          <div className="detalle">
            <img src={personaje.image} alt={personaje.name} />
            <div>
              <h1>{personaje.name}</h1>
              <p><span className={`etiqueta ${personaje.status}`}>{ESTADOS[personaje.status] ?? personaje.status}</span></p>
              <dl>
                <dt>Especie</dt><dd>{personaje.species}</dd>
                <dt>Tipo</dt><dd>{personaje.type || '—'}</dd>
                <dt>Género</dt><dd>{personaje.gender}</dd>
                <dt>Origen</dt><dd>{personaje.origin.name}</dd>
                <dt>Ubicación</dt><dd>{personaje.location.name}</dd>
                <dt>Episodios</dt>
                <dd>
                  {personaje.episode.map((url) => {
                    const epId = url.split('/').pop();
                    return <Link key={epId} className="etiqueta" to={`/episodio/${epId}`}>{epId}</Link>;
                  })}
                </dd>
              </dl>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
