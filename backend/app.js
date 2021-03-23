const { Sequelize } = require('sequelize');

  const express = require('express');
  const bodyParser = require('body-parser');
  const path = require('path');
  
  
  require('dotenv-expand')(require('dotenv').config()); // in just single line
  const sequelize = new Sequelize('groupomania', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
  });

  try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  
  const app = express();
  
  app.use((req, res, next) => { //cors 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  
  app.use(bodyParser.json()); //fichier de configuration 
  
  app.use('/images', express.static(path.join(__dirname, 'images')));
  
  module.exports = app;
  