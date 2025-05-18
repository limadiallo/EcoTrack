const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const app = express();
const PORT = 3001;
const JWT_SECRET = 'votre_secret_jwt'; // À changer en production

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/ecotrack', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connecté à MongoDB');
}).catch(err => {
    console.error('Erreur de connexion à MongoDB:', err);
});

// Middleware d'authentification
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({ _id: decoded.userId });
        
        if (!user) {
            throw new Error();
        }
        
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Veuillez vous authentifier' });
    }
};

// Chemin vers le fichier de données
const dataFilePath = path.join(__dirname, 'data.json');

// Créer le fichier de données s'il n'existe pas
if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]));
}

// Routes d'authentification
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Ce nom d\'utilisateur est déjà pris' });
        }
        
        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Créer le nouvel utilisateur
        const user = new User({
            username,
            password: hashedPassword
        });
        
        await user.save();
        
        // Générer le token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'inscription' });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Trouver l'utilisateur
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Identifiants invalides' });
        }
        
        // Vérifier le mot de passe
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ error: 'Identifiants invalides' });
        }
        
        // Générer le token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la connexion' });
    }
});

// Routes protégées
app.get('/data', auth, (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la lecture des données' });
    }
});

app.post('/data', auth, (req, res) => {
    try {
        const newData = req.body;
        const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
        
        newData.timestamp = new Date().toISOString();
        newData.userId = req.user._id;
        
        data.push(newData);
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
        
        res.status(201).json(newData);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'ajout des données' });
    }
});

app.listen(PORT, () => {
    console.log(`Serveur backend démarré sur le port ${PORT}`);
}); 