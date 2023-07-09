//Arquivo responsável pelas rotas referentes ao token

const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authConfig = require('../../config/auth.json');
const authMiddleware = require('../middlewares/auth');



const router = express.Router();

router.use(authMiddleware);

//rota de checagem do token
router.get('/', (req, res) => {
    res.send({
        ok: true,
        user: req.userId
    });

});

module.exports = app => app.use('/validateToken', router);