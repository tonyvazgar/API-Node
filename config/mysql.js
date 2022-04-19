const { Sequelize } = require("sequelize");

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USERNAME;
const password = process.env.MYSQL_PASSWORD;
const host = process.env.MYSQL_HOST;

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: "mysql",
  });

const dbConnectMySQL = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexión con MYSQL correcta :)");
    } catch (error) {
        console.log("Error de conexión de MYSQL", error)
    }
};

module.exports = {dbConnectMySQL, sequelize};