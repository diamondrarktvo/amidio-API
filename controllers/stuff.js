const Thing = require("../modeles/Thing");
const fs = require("fs");

exports.createThing = (req, res, next) => {
    //on instance le modele et passe en parametre le corps de la requêtes
    //ceci peut s'ecrire aussi titre : req.body.titre, et ainsi de suite

    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id;
    delete thingObject.userId;

    const thing = new Thing({
        ...thingObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
        }`,
    });

    thing
        .save()
        .then(() => res.status(201).json({ message: "Objet enregistrer!" }))
        .catch((error) => res.status(400).json({ error }));
};

exports.updateThing = (req, res, next) => {
    const thingObject = req.file
        ? {
              ...JSON.parse(req.body.thing),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
              }`,
          }
        : { ...req.body };
    delete thingObject._userId;
    Thing.findOne({ _id: req.params.id })
        .then((thing) => {
            if (thing.userId != req.auth.userId) {
                res.status(401).json({ message: "Not authorized!" });
            } else {
                Thing.updateOne(
                    { _id: req.params.id },
                    { ...thingObject, _id: req.params.id }
                )
                    .then(() =>
                        res.status(200).json({ message: "Objet modifié !" })
                    )
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(400).json({ error }));
};

exports.deleteOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.userId }).then((thing) => {
        if (thing.userId != req.auth.userId) {
            res.status(401).json({ message: "Non autorisé!" });
        } else {
            const filename = thing.imageUrl.split("images/")[1];
            fs.unlink(`images/${filename}`, () => {
                Thing.deleteOne({ _id: req.params.id })
                    .then(() =>
                        res.status(200).json({ message: "Objet suprimé" })
                    )
                    .catch((error) => res.status(500).json({ error }));
            });
        }
    });
};

exports.getOneThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then((things) => res.status(200).json(things))
        .catch((error) => res.status(404).json({ error }));
};

exports.getAllThing = (req, res, next) => {
    Thing.find()
        .then((things) => res.status(200).json(things))
        .catch((error) => res.status(400).json({ error }));
};
