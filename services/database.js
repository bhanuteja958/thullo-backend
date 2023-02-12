const {Sequelize} = require('sequelize');
const {DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_DIALECT} = process.env

const connection = new Sequelize(
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD,
    {
        host: DATABASE_HOST,
        dialect: DATABASE_DIALECT
    }
)

const connectToDB = async () => {
    try{
        await connection.authenticate();
        console.log('DB connection has been established');
    } catch(error) {
        console.log('Unable to connect to DB: ',error)
    }
}

const getDBConnection = () => connection;

module.exports = {
    connectToDB,
    getDBConnection
}