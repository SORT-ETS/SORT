var express = require('express');
var proxy = require('express-http-proxy');
var app = express();

app.use('/api', proxy(process.env.SERVER));

app.use(express.static('public'));

app.listen(6088, function () {
	  console.log('Web-client listening on port 6088!');
})
