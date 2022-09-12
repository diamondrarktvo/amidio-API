const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const routeStuff = require("./routes/stuff");
const authRoute = require("./routes/auth");
const path = require("path");

mongoose
    .connect(
        `mongodb+srv://dama:${process.env.DB_DATABASE}@cluster-dama.qgpqn.mongodb.net/${process.env.DB_DATABASE}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log("Connexion à Mongo réussi"))
    .catch(() => console.log("Connexion à Mongo échoué"));

//pour les headers éviter CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    //ici on préfere header que setHeader pour éviter la problème CORS sur différentes méthodes
    res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, GET, DELETE, OPTIONS"
    );
    next();
});

//pour la route post, afin qu'express prend toutes les requêtes qui ont comme
//content-type: application/json
app.use(bodyParser.json());

//indique à express qu'il faut gérer la ressource images de manière statique
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/stuff", routeStuff);
app.use("/api/auth", authRoute);

module.exports = app;
