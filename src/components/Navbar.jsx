import { NavLink } from 'react-router-dom';

export default function Navbar({ onLogout }) {
  return (
    <header className="navbar">
      <span className="logo">LeeFlix</span>
      <nav>
        <NavLink to="/" end>Episodios</NavLink>
        <NavLink to="/personajes">Personajes</NavLink>
      </nav>
      <button className="btn ghost" onClick={onLogout}>Cerrar sesión</button>
    </header>
  );
}
