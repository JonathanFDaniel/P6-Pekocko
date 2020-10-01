const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Sauce = require('./models/Sauce');
const User = require('./models/User');

mongoose.connect('mongodb+srv://JoFDaniel:Ikigai56@cluster1.gtwm5.mongodb.net/P6-piquante?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.post('/api/sauces', (req, res, next) => {
    console.log(req.body);
    delete req.body._id;
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(400).json({ error })) 
});

app.post('/api/auth/login', (req, res, next) => {
    console.log(req.body);
    delete req.body._id;
    const user = new User({
        ...req.body
    });
    user.save()
    .then(() => res.status(201).json({ message: 'utilisateur enregistré !'}))
    .catch(error => res.status(400).json({ error }))
}); 

app.use('/api/sauces', (req, res, next) => {
    const sauces = [
        {
        _id: 'oimjoijlhui',
        name: 'Black Garlic',
        manufacturer: 'Bravado Spice Company',
        description: 'Team Bravado is back at it with an elevated offering where Carolina Reaper meets aged black garlic. The sweetness of the slowly cooked garlic tempers the initial bitter burn of the Reaper, but not for long... This is a biting hot sauce you\'ll want in marinades, sauces, dressings, and on those garlic wings! ',
        heat: 6,
        likes: 100,
        dislikes: 0,
        imageUrl: 'https://www.chilliworld.com/content/images/thumbs/0000827_blairs-ultra-death-sauce-in-a-coffin_550.jpeg',
        mainPepper: 'Carolina Reaper',
        usersLiked: [],
        usersDisliked: []
        },
    ];
    res.status(200).json(sauces);
}); 

app.use((req, res) => {
    res.json({ message: 'Votre requête a bien été reçue !'});
});

module.exports = app;