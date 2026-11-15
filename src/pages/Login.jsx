import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Credenciales de demostración (validación local, sin servidor)
const USUARIO = 'admin';
const CLAVE = '1234';

export default function Login({ onLogin }) {
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const enviar = (e) => {
    e.preventDefault();
    if (!usuario.trim() || !clave) {
      setError('Completa el usuario y la contraseña.');
    } else if (usuario.trim() !== USUARIO || clave !== CLAVE) {
      setError('Usuario o contraseña incorrectos.');
    } else {
      onLogin();
      navigate('/');
    }
  };

  return (
    <form className="login" onSubmit={enviar}>
      <div className="logo">LeeFlix</div>
      <p className="muted">Inicia sesión para ver el catálogo.</p>
      <label htmlFor="usuario">Usuario</label>
      <input id="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} autoComplete="username" />
      <label htmlFor="clave">Contraseña</label>
      <input id="clave" type="password" value={clave} onChange={(e) => setClave(e.target.value)} autoComplete="current-password" />
      <div className="err">{error}</div>
      <button className="btn" type="submit">Iniciar sesión</button>
      <p className="muted"><small>Demo: usuario admin, contraseña 1234</small></p>
    </form>
  );
}
