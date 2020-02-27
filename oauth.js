
var Sequelize=require('sequelize');

/**
 * Module dependencies.
 */

// var mysql = require('mysql')
//   var pg = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : '',
//     database : 'test'
//   });
// pg.connect()

//   pg.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//     if (err) throw err
      
//     console.log('The solution is: ', rows[0].solution)

//   })

var pg = new Sequelize('express', 'root', 'Mass4Pass', {
  // mysql is the default dialect, but you know...
  // for demo purporses we are defining it nevertheless :)
  // so: we want mysql!
  dialect: 'mysql'
});
/*
 * Get access token.
 */

module.exports.getAccessToken = function(bearerToken) {
  console.log('1111');
  return pg.query('SELECT access_token, expires, client_id FROM oauth_access_tokens WHERE access_token = \''+bearerToken+'\'')
    .success(function(result) {
      var token = result[0];
       if (!token) {
          return;
      }else{
        return {
          accessToken: token.access_token,
          client: {id: token.client_id},
          accessTokenExpiresAt: token.expires,
          user: {id: token.userId}, // could be any object
        };
      }
    });
};

/**
 * Get client.
 */

module.exports.getClient = function *(clientId, clientSecret) {
   console.log(clientSecret);
  // pg.query("SELECT client_id, client_secret, redirect_uri FROM oauth_clients WHERE client_id = '"+clientId+"' AND client_secret = '"+clientSecret+"'") 
  //   .success(function (result) {
  //   //if (err) throw err
      
  //   //console.log(err)
  // console.log(result[0])
  // //console.log(oAuthClient)

  // })
  
  return pg.query("SELECT client_id, client_secret, redirect_uri FROM oauth_clients WHERE client_id = '"+clientId+"' AND client_secret = '"+clientSecret+"'")
    .success(function(result) {
      var oAuthClient = result[0];

      if (!oAuthClient) {
        return;
      }

      return {
        clientId: oAuthClient.client_id,
        clientSecret: oAuthClient.client_secret,
        grants: ['client_credentials'], // the list of OAuth2 grant types that should be allowed
      };
    });
};


module.exports.getUserFromClient = function *(client) {
  // console.log(clientSecret);
  // pg.query("SELECT client_id, client_secret, redirect_uri FROM oauth_clients WHERE client_id = '"+clientId+"' AND client_secret = '"+clientSecret+"'") 
  //   .success(function (result) {
  //   //if (err) throw err
      
  //   //console.log(err)
  // console.log(result[0])
  // //console.log(oAuthClient)

  // })
  
  return pg.query("SELECT * FROM oauth_clients WHERE client_id = '"+client.clientId+"' ")
    .success(function(result) {
       var oAuthClient = result[0];
    return oAuthClient;
      
    });
};

/**
 * Get refresh token.
 */

module.exports.getRefreshToken = function *(bearerToken) {
  console.log('222');
  return pg.query('SELECT access_token, expires, client_id FROM oauth_access_tokens WHERE access_token  = \''+bearerToken+'\'')
    .success(function(result) {
      return result[0];
    });
};

/*
 * Get user.
 */

module.exports.getUser = function *(username, password) {
  return pg.query('SELECT id FROM users WHERE username = $1 AND password = $2', [username, password])
    .success(function(result) {
      return result[0];
    });
};

/**
 * Save token.
 */

module.exports.saveToken = function *(token, client, user) {
   console.log(token);
   console.log(user);
   var expiresat='2017-10-06 12:30:52';
  return pg.query('INSERT INTO oauth_access_tokens(access_token, expires, client_id) VALUES (\''+token.accessToken+'\', \''+expiresat+'\', \''+client.clientId+'\')').
  success(function(result) {
       console.log(user.user_id);
    return {
       accessToken:token.accessToken,
      expires:token.accessTokenExpiresOn,
      client:client.clientId,
      user:1
    }; // TODO return object with client: {id: clientId} and user: {id: userId} defined
  });
};