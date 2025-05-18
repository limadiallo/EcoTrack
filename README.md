# 🌱 Eco-Track

Eco-Track est une application web moderne permettant de suivre et d'analyser votre empreinte écologique. L'application offre une interface intuitive pour enregistrer et visualiser vos consommations d'énergie, d'eau, de papier et vos émissions de CO₂.
Le site est accessible ici [![Voir en ligne](https://img.shields.io/badge/Démo-en%20ligne-green?style=for-the-badge&logo=github)](https://limadiallo.github.io/EcoTrack/)

## Fonctionnalités

- Tableau de bord interactif avec visualisation des données
- Suivi en temps réel des consommations
- Système d'authentification sécurisé
- Interface responsive et moderne
- Graphiques et rapports personnalisés
- Données sécurisées et privées

## Technologies utilisées

### Frontend
- React + Vite
- Tailwind CSS
- Chart.js pour les visualisations
- React Router pour la navigation

### Backend
- Node.js
- Express.js
- MongoDB pour la base de données
- JWT pour l'authentification

## Installation

1. Clonez le repository :
```bash
git clone https://github.com/limadiallo/ecotrack.git
cd ecotrack
```

2. Installez les dépendances du backend :
```bash
cd backend
npm install
```

3. Installez les dépendances du frontend :
```bash
cd ../frontend
npm install
```

4. Configurez MongoDB :
- Assurez-vous que MongoDB est installé et en cours d'exécution sur votre machine
- La base de données sera créée automatiquement lors de la première utilisation

## Démarrage

1. Démarrez le serveur backend :
```bash
cd backend
npm start
```

2. Dans un nouveau terminal, démarrez le frontend :
```bash
cd frontend
npm start
```

3. Accédez à l'application dans votre navigateur :
```
http://localhost:5173
```

## Utilisation

1. Créez un compte utilisateur
2. Connectez-vous à votre compte
3. Commencez à ajouter vos données de consommation
4. Visualisez vos données dans le tableau de bord
5. Générez des rapports personnalisés

## Sécurité

- Les mots de passe sont hashés avant d'être stockés
- Authentification par JWT
- Protection des routes sensibles
- Validation des données côté serveur

## Auteurs
- Lana ANRETAR
- Halimatou DIALLO
- Jeanne-Miriam MATJEMIS MASSING
- Ninah Roseline SOLOFONIAINA
