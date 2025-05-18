const Reports = () => (
  <div className="container mx-auto py-8">
    <h1 className="text-3xl font-bold mb-6 text-green-600">Rapports</h1>
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Rapports pré-configurés</h2>
      <div className="flex space-x-4 mb-4">
        <button className="bg-gray-100 px-4 py-2 rounded">Mensuel</button>
        <button className="bg-gray-100 px-4 py-2 rounded">Annuel</button>
        <button className="bg-blue-100 px-4 py-2 rounded">Télécharger</button>
      </div>
      <h2 className="text-xl font-semibold mb-2">Créer un rapport personnalisé</h2>
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Créer un rapport personnalisé</button>
    </div>
  </div>
);
export default Reports; 