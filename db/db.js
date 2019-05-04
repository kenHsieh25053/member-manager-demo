const Sequelize = require('sequelize');

// Set up database connection
const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USERNAME,
    process.env.PASSWORD, {
        host: '127.0.0.1',
        dialect: 'mysql',
        logging: false
    }, );

// Connection test
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize