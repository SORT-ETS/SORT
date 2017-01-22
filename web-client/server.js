var express = require('express');
var proxy = require('express-http-proxy');
var app = express();

app.use('/api', proxy("server:5000"));

app.use(express.static('public'));

app.listen(3000, function () {
	  console.log('Example app listening on port 3000!');
})
