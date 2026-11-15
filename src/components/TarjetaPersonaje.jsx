import { useNavigate } from 'react-router-dom';

const ESTADOS = { Alive: 'Vivo', Dead: 'Muerto', unknown: 'Desconocido' };

export default function TarjetaPersonaje({ personaje }) {
  const navigate = useNavigate();
  return (
    <button className="tarjeta tarjeta-personaje" onClick={() => navigate(`/personaje/${personaje.id}`)}>
      <img src={personaje.image} alt={personaje.name} loading="lazy" />
      <div className="tarjeta-info">
        <strong>{personaje.name}</strong>
        <small className={`estado ${personaje.status}`}>{ESTADOS[personaje.status] ?? personaje.status}</small>
      </div>
    </button>
  );
}
