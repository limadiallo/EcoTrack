import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl">🌱</span>
              <span className="text-white text-xl font-bold">EcoTrack</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-green-200 transition-colors">
              Accueil
            </Link>
            {isLoggedIn && (
              <>
                <Link to="/dashboard" className="text-white hover:text-green-200 transition-colors">
                  Tableau de bord
                </Link>
                <Link to="/reports" className="text-white hover:text-green-200 transition-colors">
                  Rapports
                </Link>
                <Link to="/settings" className="text-white hover:text-green-200 transition-colors">
                  Paramètres
                </Link>
              </>
            )}
            <Link to="/support" className="text-white hover:text-green-200 transition-colors">
              Support
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-50 transition-colors"
              >
                Déconnexion
              </button>
            ) : (
              <>
                <Link
                  to="/register"
                  className="text-white hover:text-green-200 transition-colors"
                >
                  Inscription
                </Link>
                <Link
                  to="/login"
                  className="bg-white text-green-600 px-4 py-2 rounded-md hover:bg-green-50 transition-colors"
                >
                  Connexion
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 