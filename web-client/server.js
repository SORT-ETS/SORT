"use strict";

// Node's implementation does not allow the use of import/export yet, hence
// the difference with client-side code
var HTTPServer = require('./src/http-server');

// Server process variables
var httpServerPort = process.env.PORT || 6088;
var proxyHostURI = process.env.PROXY || 'http://sort.ntfournier.com/';

var httpServer = new HTTPServer(httpServerPort, proxyHostURI);

httpServer.startServer();
