
// TRABALHA COM ROTAS QUE REQUEREM AUTENTICAÇÃO;

//Arquivo responsável pelas rotas referentes a autenticação


const express = require('express');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const User = require('../models/user');
const authConfig = require('../../config/auth.json');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

function tokenGenerator(params = {}) {

    return jwt.sign(params, authConfig.authSecret, {
        expiresIn: 10800,

    } );
}

//rota de criação de novo usuario
router.post('/register', async (req,res) => {
    const {email} = req.body;
    
    try {
        if (await User.findOne({email})) {
            return res.status(400).json({error: 'User already exists'});
        }

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({user, token: tokenGenerator({ id: user.id})});
    
    } catch (error) {
        return res.status(400).json({error: 'Registration failed'});
    }
});

//rota de login
router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(400).json({error: 'Invalid email or password'});
    }
    
    user.password = undefined;

    res.send({user, token: tokenGenerator({ id: user.id})});

});

router.put('/change-password', (req,res) => {
    const {resetLink, newPassword} = req.body;

    if(resetLink){
        jwt.verify(resetLink, authConfig.resetpassSecret, (error, success) => {
            
            if (error) {
                return res.status(400).json({error: 'Token invalid or expired'});
            }else{
                User.findOne({resetLink}, (error, user) => {
                    if (!user) {
                        return res.status(400).json({error: 'No user with this token'});
                    }else{
                        const obj = {
                            password: newPassword,
                            resetLink: ''
                        };

                        user = _.extend(user, obj);
                        user.save((error, result) => {
                            if (error) {
                                return res.status(400).json({error: 'Reset password error'});
                            } else {
                                return res.status(200).json(
                                    {message:'password changed succesfully'}
                                );
                            }
                    });
                    
                }}).select('+password');
                
            }
        });

    }else{
        return res.status(400).json({error: 'Invalid token'});
    }

});

//checa se o token é válido, tudo abaixo daqui necessita ter um token para funcionar
router.use(authMiddleware);

router.get('/:userId', async (req,res) =>{
    try {
        const user = await User.findById(req.params.userId);

        return res.send({user})
    } catch (error) {
        return res.status(400).json({error: 'error showing the user'})
    }
});

router.put('/:userId', async (req,res) =>{
    try {
        const { name, email, password } = req.body;

        const user = await User.findByIdAndUpdate(req.params.userId, {
            name,
            email,
            password
        }, { new: true });

        user.pre('save', async function(next){
            const hash = await bcrypt.hash(this.password, 15);
            this.password = hash;

            next();
        });
 
        return res.send({ user });
    }catch (error) {
        return res.status(400).json({error: 'error updating the user'})
    }
});

router.delete('/:userId', async (req,res) =>{
    try {
        await User.findByIdAndRemove(req.params.userId);

        return res.send()
    } catch (error) {
        return res.status(400).json({error: 'error deleting the user'})
    }
});

module.exports = app => app.use('/auth', router);