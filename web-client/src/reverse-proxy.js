var proxy = require('express-http-proxy');

// Class wrapper for the express-http-proxy module
class ReverseProxy extends proxy {
	constructor(host) {
		// Sets host in the extended module class
		console.log(host)
		super(host);
	}
}

module.exports = ReverseProxy;