import {Sequelize}  from 'sequelize';

const {DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST} = process.env

const connection = new Sequelize(
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD,
    {
        host: DATABASE_HOST,
        dialect: "mysql"
    }
)

export const connectToDB = async () => {
    try{
        await connection.authenticate();
        console.log('DB connection has been established');
    } catch(error) {
        console.log('Unable to connect to DB: ', error.message);
    }
}

export const  getDBConnection = () => connection;