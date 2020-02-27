'use strict';

 //Development:
module.exports = {
  db_connection: {
    username: "developer",
    password: "Mass4Pass",
    database: "express",
    host: "192.168.0.11",
    dialect: "mysql"
  },
  facebook: {
    clientID:  'APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: '/api/auth/facebook/callback'
  },
  api_version:"1.0.0",
  api_developer:"www.massoftind.com"
};
