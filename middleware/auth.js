const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        let token = req.body.authorization.split(' ')[1]; //on split le token car celui-ci sera accompagné de Bearer
        let decodeToken = token.verify(token, 'RANDOM_TOKEN_SECRET_KEY');
        let userId = decodeToken.userId;
        req.auth = {
            userId : userId
    };
        next();
    } catch{
        (error) => res.status(401).json({error});
    }
}