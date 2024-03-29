const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        let token = req.body.authorization.split(" ")[1]; //on split le token car celui-ci sera accompagné de Bearer
        let decodeToken = jwt.verify(token, "RANDOM_TOKEN_SECRET_KEY");
        let userId = decodeToken.userId;
        req.auth = {
            userId: userId, //on prélève l'userId utilisé dans d'autres controllers ici
        };
        next();
    } catch (error) {
        res.status(400).json({ error });
    }
};
