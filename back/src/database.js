// Arquivo responsavel por se conectar à base de dados

const mongoose = require('mongoose');

function connectToDatabase() {
    mongoose.connect(
        process.env.DATABASE_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    );

    mongoose.Promise = global.Promise;

    const db = mongoose.connection;
    db.on("error", (error) => console.error(error));
    db.once("open", () => console.log("Connected to the database"));
}

module.exports = connectToDatabase;