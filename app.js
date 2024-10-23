const express = require('express');
const app = express();
const PORT = 3000;

// Middleware pour parser le JSON
app.use(express.json());

// Exemple de données d'utilisateurs (vous pouvez remplacer cela par une base de données plus tard)
let users = [
    { id: 1, username: 'user1', email: 'user1@example.com' },
    { id: 2, username: 'user2', email: 'user2@example.com' },
];

// Route pour la racine
app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API des utilisateurs !');
});

// Route pour récupérer tous les utilisateurs
app.get('/api/users', (req, res) => {
    res.json(users);
});

// Route pour récupérer un utilisateur par son ID
app.get('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('Utilisateur non trouvé.');
    res.json(user);
});

// Route pour ajouter un nouvel utilisateur
app.post('/api/users', (req, res) => {
    const { username, email } = req.body;
    if (!username || !email) {
        return res.status(400).send('Le nom d\'utilisateur et l\'email sont requis.');
    }

    const newUser = {
        id: users.length + 1,
        username,
        email,
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Route pour mettre à jour un utilisateur
app.put('/api/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('Utilisateur non trouvé.');

    const { username, email } = req.body;
    user.username = username || user.username;
    user.email = email || user.email;

    res.json(user);
});

// Route pour supprimer un utilisateur
app.delete('/api/users/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).send('Utilisateur non trouvé.');

    users.splice(userIndex, 1);
    res.status(204).send();  // 204 No Content
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});