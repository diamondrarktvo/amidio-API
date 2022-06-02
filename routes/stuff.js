const express = require('express');
const router = express.Router();
const stuffCtrl = require('../controllers/stuff');

//middleware pour l'ajout
router.post('/', stuffCtrl.createThing);

//middleware pour la mise a jour d'un objet
router.put('/:id', stuffCtrl.updateThing);

//middleware pour la suppression d'un objet
router.delete('/:id', stuffCtrl.deleteOneThing);

//middleware pour get one object
router.get('/:id', stuffCtrl.getOneThing);

//middleware get all object
router.get('/', stuffCtrl.getAllThing);

module.exports = router;