//Arquivo responsável por delimitar os parâmetros dos dados da base de dados
// Nesse caso, aqui esta o modelo do dado de usuário

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    resetLink: {
        data: String,
        default: ''
    }
});



const User = mongoose.model('User', UserSchema);

module.exports = User; 