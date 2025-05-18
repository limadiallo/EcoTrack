import { Link } from 'react-router-dom';

const Home = () => (
  <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
    {/* Hero Section */}
    <div className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-green-800 mb-6">
          Optimisez votre<br />empreinte écologique
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Suivez, analysez et réduisez votre impact environnemental avec notre solution intuitive
        </p>
        <Link
          to="/register"
          className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl"
        >
          Commencer gratuitement
        </Link>
      </div>
    </div>

    {/* Features Section */}
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Fonctionnalités principales
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-green-50 p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-2">Suivi en temps réel</h3>
            <p className="text-gray-600">
              Visualisez vos données de consommation et vos progrès en temps réel
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">📈</div>
            <h3 className="text-xl font-semibold mb-2">Rapports détaillés</h3>
            <p className="text-gray-600">
              Générez des rapports personnalisés pour analyser vos performances
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg shadow-md">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Objectifs personnalisés</h3>
            <p className="text-gray-600">
              Définissez et suivez vos objectifs de réduction d'impact
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Testimonials Section */}
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
        Ils nous font confiance
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 italic mb-4">
            "Un outil simple et efficace pour les PME. La visualisation des données est particulièrement utile."
          </p>
          <div className="font-semibold text-green-600">Girls Consulting</div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600 italic mb-4">
            "EcoTrack nous a permis de réduire notre consommation d'énergie de 25% en seulement 3 mois."
          </p>
          <div className="font-semibold text-green-600">Tech Solutions</div>
        </div>
      </div>
    </div>

    {/* CTA Section */}
    <div className="bg-green-600 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Prêt à commencer ?
        </h2>
        <p className="text-xl mb-8">
          Rejoignez des centaines d'entreprises qui réduisent leur impact environnemental
        </p>
        <Link
          to="/register"
          className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors shadow-lg hover:shadow-xl"
        >
          Créer un compte gratuit
        </Link>
      </div>
    </div>
  </div>
);

export default Home; 