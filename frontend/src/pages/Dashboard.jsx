import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const COLORS = {
  electricity: 'rgba(34, 197, 94, 0.7)',
  water: 'rgba(59, 130, 246, 0.7)',
  paper: 'rgba(251, 191, 36, 0.7)',
  co2: 'rgba(239, 68, 68, 0.7)',
};

const LABELS = {
  electricity: 'Électricité (kWh)',
  water: 'Eau (m³)',
  paper: 'Papier (kg)',
  co2: 'Émissions CO₂ (kg)',
};

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/data', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        
        const data = await response.json();
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculer les totaux
  const totals = {
    electricity: data.filter(item => item.type === 'electricity').reduce((sum, item) => sum + Number(item.value), 0),
    water: data.filter(item => item.type === 'water').reduce((sum, item) => sum + Number(item.value), 0),
    paper: data.filter(item => item.type === 'paper').reduce((sum, item) => sum + Number(item.value), 0),
    co2: data.filter(item => item.type === 'co2').reduce((sum, item) => sum + Number(item.value), 0),
  };

  // Regrouper par date et par type
  const dates = Array.from(new Set(data.map(item => new Date(item.timestamp).toLocaleDateString())));
  const types = ['electricity', 'water', 'paper', 'co2'];

  const datasets = types.map(type => ({
    label: LABELS[type],
    backgroundColor: COLORS[type],
    data: dates.map(date => {
      return data
        .filter(item => item.type === type && new Date(item.timestamp).toLocaleDateString() === date)
        .reduce((sum, item) => sum + Number(item.value), 0);
    }),
  }));

  const chartData = {
    labels: dates,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Consommations par type et par date',
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Valeur'
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
        <div className="text-xl text-gray-600">Chargement des données...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">Tableau de bord</h1>
          <Link
            to="/add-data"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md hover:shadow-lg"
          >
            Ajouter des données
          </Link>
        </div>

        {/* Cartes de résumé */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {types.map(type => (
            <div key={type} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">{LABELS[type]}</h3>
              <p className="text-2xl font-bold text-green-600">{totals[type]}</p>
            </div>
          ))}
        </div>

        {/* Graphique */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Évolution des consommations</h2>
          <div className="h-96">
            <Bar data={chartData} options={options} />
          </div>
        </div>

        {/* Tableau des données */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Historique des données</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valeur</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center">
                        <span className={`w-3 h-3 rounded-full mr-2`} style={{ backgroundColor: COLORS[item.type] }}></span>
                        {LABELS[item.type] || item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.value}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(item.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 