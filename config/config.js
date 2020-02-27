process.env.NODE_ENV = 'development';

// load the config file for the current environment
var config = require('./env/' + process.env.NODE_ENV);

// extend config with universal config data
config.someEnvAgnosticSetting = true;

// export config
module.exports = config;