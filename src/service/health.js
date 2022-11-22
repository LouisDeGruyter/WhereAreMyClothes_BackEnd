const packageJSON = require('../../package.json');
const ping = () => ({pong:true});
//naam, versie, connectie met database werkt...
const getVersion = () => ({
env: process.env.NODE_ENV,
 name: packageJSON.name,
 version: packageJSON.version,
});
module.exports = {ping,getVersion};
