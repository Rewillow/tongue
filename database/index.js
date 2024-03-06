require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectModule: require('mysql2')
});

// Testa la connessione al database
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connessione al database riuscita.');
    } catch (error) {
        console.error('Errore durante la connessione al database:', error);
    }
})();

module.exports = sequelize;