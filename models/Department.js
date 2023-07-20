const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Department extends Model {}

Department.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: "department",
  }
);

module.exports = Department;