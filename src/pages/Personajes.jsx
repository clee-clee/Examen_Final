import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TarjetaPersonaje from '../components/TarjetaPersonaje';
import { getCharacters } from '../services/api';

export default function Personajes({ onLogout }) {
  const [pagina, setPagina] = useState(1);
  const [datos, setDatos] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setDatos(null);
    getCharacters(pagina)
      .then(setDatos)
      .catch((e) => setError(e.message));
  }, [pagina]);

  return (
    <>
      <Navbar onLogout={onLogout} />
      <main>
        <h1>Personajes</h1>
        {error && <p className="err">{error}. Revisa tu conexión e intenta de nuevo.</p>}
        {!datos && !error && <p className="muted">Cargando…</p>}
        {datos && (
          <>
            <div className="cuadricula">
              {datos.results.map((p) => <TarjetaPersonaje key={p.id} personaje={p} />)}
            </div>
            <div className="paginador">
              <button className="btn ghost" disabled={!datos.info.prev} onClick={() => setPagina(pagina - 1)}>Anterior</button>
              <span className="muted">Página {pagina} de {datos.info.pages}</span>
              <button className="btn ghost" disabled={!datos.info.next} onClick={() => setPagina(pagina + 1)}>Siguiente</button>
            </div>
          </>
        )}
      </main>
    </>
  );
}
