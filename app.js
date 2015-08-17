var fs = require('fs');
//save timestamp for grunt and save in process
process.timestamp = (new Date()).getTime();
fs.writeFile('.timestamp', process.timestamp);

// Start sails and pass it command line arguments
require('sails').lift(require('optimist').argv);
