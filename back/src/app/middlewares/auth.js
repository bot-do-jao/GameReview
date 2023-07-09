//Middleware responsável por checar se o token de sessão válido está ativo

const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {

        return res.status(401).json({ error: 'Token error'}); 

    }

    const token = authHeader;

    jwt.verify(token, authConfig.authSecret, (error, decoded) => {
        if(error) {

            return res.status(401).json({ error: 'Token invalid'});
        }

        req.userId = decoded.id;
        return next();

    });

};