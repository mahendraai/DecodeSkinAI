const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://user:password@localhost:5432/skin_analysis_db');

const SkinAnalysis = sequelize.define('SkinAnalysis', {
    blemishes_detected: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    skin_type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    score: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    photo_url: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {});

module.exports = { SkinAnalysis };
