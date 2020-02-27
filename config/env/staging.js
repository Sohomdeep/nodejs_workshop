'use strict';

 //Development:
module.exports = {
  db_connection: {
    username: "root",
    password: "",
    database: "staging",
    host: "localhost",
    dialect: "mysql"
  },
  facebook: {
    clientID:  'APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: '/api/auth/facebook/callback'
  }
};
