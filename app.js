const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const routeStuff = require('./routes/stuff');

mongoose.connect('mongodb+srv://dama:Diamondra_10@cluster-dama.qgpqn.mongodb.net/?retryWrites=true&w=majority', 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à Mongo réussi'))
  .catch(() => console.log('Connexion à Mongo échoué'));


//pour les headers éviter CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  //ici on préfere header que setHeader pour éviter la problème CORS sur différentes méthodes
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});

//pour la route post, afin qu'express prend toutes les requêtes qui ont comme 
//content-type: application/json
app.use(bodyParser.json());

app.use('/api/stuff', routeStuff);

module.exports=app;