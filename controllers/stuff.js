const Thing = require('../modeles/Thing');

exports.createThing = (req, res, next) => {
  //on instance le modele et passe en parametre le corps de la requêtes
  //ceci peut s'ecrire aussi titre : req.body.titre, et ainsi de suite
  
  delete req.body._id;
    const thing = new Thing({
      ...req.body
    });

  thing.save()
      .then(() => res.status(201).json({message:'Objet enregistrer!'}))
      .catch((error) => res.status(400).json({error}));
};

exports.updateThing = (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

exports.deleteOneThing = (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
  .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
  .catch(error => res.status(400).json({ error }));
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id : req.params.id})
    .then(things => res.status(200).json(things))
    .catch((error) => res.status(404).json({error}))
};

exports.getAllThing = (req, res, next) => {
	 Thing.find()
   .then((things) => res.status(200).json(things))
   .catch(error => res.status(400).json({error}))
};