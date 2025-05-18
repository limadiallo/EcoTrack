const Settings = () => (
  <div className="container mx-auto py-8">
    <h1 className="text-3xl font-bold mb-6 text-green-600">Paramètres</h1>
    <div className="bg-white rounded-lg shadow p-6">
      <ul className="space-y-4">
        <li>Gestion des données utilisateurs</li>
        <li>Paramètres de notifications</li>
        <li>Connexion aux plateformes tierces</li>
        <li className="flex items-center space-x-2">
          <span>🌥️</span>
          <span>Carbone</span>
        </li>
        <li className="flex items-center space-x-2">
          <span>⚡</span>
          <span>Énergie</span>
        </li>
      </ul>
    </div>
  </div>
);
export default Settings; 