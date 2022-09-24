const Sequelize = require("sequelize");

const sequelizeDb = require("../util/database");

const Person = sequelizeDb.define("person", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  age: Sequelize.INTEGER,
  work: Sequelize.STRING,
});

module.exports = Person;
