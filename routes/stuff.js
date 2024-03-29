const express = require("express");
const router = express.Router();
const stuffCtrl = require("../controllers/stuff");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer_config");

//middleware pour l'ajout
router.post("/", auth, multer, stuffCtrl.createThing);

//middleware pour la mise a jour d'un objet
router.put("/:id", auth, multer, stuffCtrl.updateThing);

//middleware pour la suppression d'un objet
router.delete("/:id", auth, stuffCtrl.deleteOneThing);

//middleware pour get one object
router.get("/:id", auth, stuffCtrl.getOneThing);

//middleware get all object
router.get("/", auth, stuffCtrl.getAllThing);

module.exports = router;
