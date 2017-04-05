"use strict";

var express = require('express');
var bodyParser = require('body-parser');

var ReverseProxy = require('./reverse-proxy');

/**
* The HTTPServer class uses an Express http server as its main engine.
* It sets its parameters to handle images analysis requests and delegates
* them to the ReverseProxy server which serves as an API.
*
* It is also used to serve static content for the user to use the API.
*/
class HTTPServer {

	constructor(port, proxyHostURI, useStub) {
		// Using agregation with express instance, because inheritence was limited
		// Class functions were somehow not accessible
		this.app = express();

		this.port = port;
		this.proxyHostURI = proxyHostURI;
		this.useStub = useStub;
	}

	startServer() {
		// Start express server
		this.app.listen(this.port, () => {
			console.log('Web-client HTTP server listening on port ' + this.port);
		});

		this._handleImagesResquests();
		this._deliverStaticFiles();
		this._setReverseProxy();
	}

	_handleImagesResquests() {
		// Enables bigger HTTP requests for file/image delegation
		this.app.use(bodyParser.json({limit: '50mb'}));
		this.app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
	}

	_deliverStaticFiles() {
		// Makes public for the client every file in the public folder
		// index.html is served by default on '/'
		this.app.use(express.static('public'));
	}

	_setReverseProxy() {
		// Instantiate wrapper as private reference
		this._reverseProxy = new ReverseProxy(this.proxyHostURI);

		// Delegates every HTTP /api request to the proxy
		let self = this;
		this.app.post('/api/image', function (req, res, next) {
			if (req.body.useStub === undefined)
          req.body.useStub = self.useStub;
			next();
		});
		this.app.use('/api', this._reverseProxy);
	}
}

module.exports = HTTPServer;
