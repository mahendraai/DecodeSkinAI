const { Sequelize } = require('sequelize');
require('dotenv').config();

// Database configuration
const sequelize = new Sequelize(
    process.env.DB_NAME,  // Database name
    process.env.DB_USER,  // Database user
    process.env.DB_PASS,  // Database password
    {
        host: process.env.DB_HOST,  // Database host (e.g., localhost)
        dialect: 'postgres',  // Using PostgreSQL
        logging: false,  // Set to true if you want to see raw SQL logs
    }
);

// Test the database connection
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, connectDB };
