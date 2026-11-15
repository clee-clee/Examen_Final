import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Home from './pages/Home';
import Personajes from './pages/Personajes';
import DetalleEpisodio from './pages/DetalleEpisodio';
import DetallePersonaje from './pages/DetallePersonaje';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('auth') === 'true'
  );

  const handleLogin = () => {
    localStorage.setItem('auth', 'true');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('auth');
    setIsAuthenticated(false);
  };

  // Protege una ruta: si no hay sesión, manda al login
  const protegida = (pagina) =>
    isAuthenticated ? pagina : <Navigate to="/login" replace />;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />}
        />
        <Route path="/" element={protegida(<Home onLogout={handleLogout} />)} />
        <Route path="/personajes" element={protegida(<Personajes onLogout={handleLogout} />)} />
        <Route path="/episodio/:id" element={protegida(<DetalleEpisodio onLogout={handleLogout} />)} />
        <Route path="/personaje/:id" element={protegida(<DetallePersonaje onLogout={handleLogout} />)} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
