var HTTPServer = require('./src/http-server');

// Server process variables
var httpServerPort = process.env.PORT || 6088;
var proxyHostURI = 'localhost:5000';

var httpServer = new HTTPServer(httpServerPort, proxyHostURI);

httpServer.startServer();

// function saveImg(data) {
// 	data = data.replace(/^data:image\/(png|gif|jpeg);base64,/,'');
// 	var image = Buffer.from(b64string, 'base64')

// 	fs.writeFile(__dirname + "/out-client.png", image, function(err) {
//   		console.log('TEST', err, this);
// 	});
// }


// app.get('/', function (req, res) {
//   res.sendFile(__dirname + '/index.html')
// })

// app.post('/image', function(req, res) {
// 	res.send('OK')

// 	saveImg(req.body.imgData)
// });

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!')
// });