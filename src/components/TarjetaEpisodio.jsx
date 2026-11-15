import { useNavigate } from 'react-router-dom';

export default function TarjetaEpisodio({ episodio }) {
  const navigate = useNavigate();
  return (
    <button className="tarjeta tarjeta-episodio" onClick={() => navigate(`/episodio/${episodio.id}`)}>
      <b>{episodio.episode}</b>
      <h3>{episodio.name}</h3>
      <small>{episodio.air_date}</small>
      <small>{episodio.characters.length} personajes</small>
    </button>
  );
}
