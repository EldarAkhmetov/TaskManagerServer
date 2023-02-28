const sequelize = require('../db')

const {DataTypes} = require('sequelize')

const User = sequelize.define(
    'user', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        login: {type: DataTypes.STRING, unique: true, allowNull: false},
        password: {type: DataTypes.STRING, allowNull: false},
        role: {type: DataTypes.STRING, defaultValue: "USER"}
    }
);

const Task = sequelize.define(
    'task', {
        id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
        name: {type: DataTypes.STRING, allowNull: false},
        email: {type: DataTypes.STRING, allowNull: false},
        description: {type: DataTypes.STRING},
        is_active: {type: DataTypes.BOOLEAN},
        is_edited: {type: DataTypes.BOOLEAN}
    }
);

module.exports = {
    User,
    Task
};