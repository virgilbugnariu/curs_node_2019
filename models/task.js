'use strict';

module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    userId: { type: DataTypes.INTEGER, allowNull: false},
    name: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    timestamps: false,
  });
  Task.associate = function(models) {
    Task.belongsTo(models.User);
  };
  return Task;
};
