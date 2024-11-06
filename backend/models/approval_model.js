// models/auth_model.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config'); // Import sequelize instance

const Requests = sequelize.define('Requests', {
    
    /*id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },*/
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true, 
    },
    name: {
        type: DataTypes.STRING,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    decision: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    approved_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    approved_by_name:{
        type: DataTypes.STRING,
    },
    approved_by_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'requests',
    timestamps: false
});

Requests.sync()

module.exports = Requests;
