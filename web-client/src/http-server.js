var express = require('express');
var bodyParser = require('body-parser');

var ReverseProxy = require('./reverse-proxy');

class HTTPServer {

	constructor(port, proxyHost) {
		// Using agregation with express instance, because inheritence was limited
		// Class functions were somehow not accessible
		this.app = express();

		this.port = port;
		this.proxyHost = proxyHost;
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
		this._reverseProxy = new ReverseProxy(this.proxyHost);
		console.log(this._reverseProxy)
		// Delegates every HTTP /api request to the proxy
		this.app.use('/api', this._reverseProxy);
	}
}

module.exports = HTTPServer;