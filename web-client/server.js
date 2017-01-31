"use strict";

var HTTPServer = require('./src/http-server');

// Server process variables
var httpServerPort = process.env.PORT || 6088;
var proxyHostURI = process.env.PROXY || 'localhost:5000';

var httpServer = new HTTPServer(httpServerPort, proxyHostURI);

httpServer.startServer();
