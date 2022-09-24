const Sequelize = require("sequelize");

const sequelizeDb = new Sequelize("node-practice", "root", "1234", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelizeDb;
