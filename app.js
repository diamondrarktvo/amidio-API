const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const Thing = require('./modeles/Thing');

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

//middleware pour l'ajout
app.post('/api/stuff', (req, res, next) => {
  //on instance le modele et passe en parametre le corps de la requêtes
  //ceci peut s'ecrire aussi titre : req.body.titre, et ainsi de suite
  
  delete req.body._id;
    const thing = new Thing({
      ...req.body
    });

  thing.save()
      .then(() => res.status(201).json({message:'Objer enregistrer!'}))
      .catch((error) => res.status(400).json({error}));
})

//middleware pour la mise a jour d'un objet
app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});

//middleware pour la suppression d'un objet
app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
  .catch(error => res.status(400).json({ error }));
})

//middleware pour get one object
app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({ _id : req.params.id})
    .then(things => res.status(200).json(things))
    .catch((error) => res.status(404).json({error}))
    
})

//middleware get all object
app.get('/api/stuff', (req, res, next) => {
	 Thing.find()
   .then((things) => res.status(200).json(things))
   .catch(error => res.status(400).json({error}))
})

module.exports=app;