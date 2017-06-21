var server = require('./src/server');
var config = require('./src/server/config');

server.listen(config.port, function() {
    console.log(`Server is listened on port ${config.port}`);
});