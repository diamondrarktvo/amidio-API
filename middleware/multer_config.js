const multer = require("multer");

const MYME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images"); //on passe le nom du dossier qui doit contenir les images
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MYME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension); //responsable pour le nommage du fichier dans le dossier
    },
});

module.exports = multer({ storage: storage }).single("image");
