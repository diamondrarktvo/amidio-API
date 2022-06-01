const express = require('express');
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
  res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'OPTIONS', 'PATCH', 'DELETE');
  next();
});

//pour la route post, afin qu'express prend toutes les requêtes qui ont comme 
//content-type: application/json
app.use(express.json());

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