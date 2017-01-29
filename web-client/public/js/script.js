// var xmlHttp = new XMLHttpRequest();
// xmlHttp.open( "GET", '/api/version', false ); // false for synchronous request
// xmlHttp.send( null );

// var element = document.getElementById("serverVersion");
// element.innerHTML = "The current version of the server is " + JSON.parse(xmlHttp.responseText).version;

// xmlHttp.open( "GET", '/api/image', false ); // false for synchronous request
// xmlHttp.send( null );

// var element = document.getElementById("serverApp");
// element.innerHTML = "The current response from the server is " + xmlHttp.responseText;
function sendImage(data) {
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log('Request sent and got OK');
		}
	};

	xhttp.open("POST", "/image", true);
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send("imgData=" + data);
}

// https://developer.mozilla.org/fr/docs/WebRTC/Prendre_des_photos_avec_la_webcam
function main() {
	console.log('TEST')
	var streaming = false,
	video        = document.querySelector('#video'),
	cover        = document.querySelector('#cover'),
	canvas       = document.querySelector('#canvas'),
	photo        = document.querySelector('#photo'),
	startbutton  = document.querySelector('#startbutton'),
	width = 320,
	height = 0;

	navigator.getMedia = ( navigator.getUserMedia ||
		navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia ||
		navigator.msGetUserMedia);

	navigator.getMedia(
	{
		video: true,
		audio: false
	},
	function(stream) {
		if (navigator.mozGetUserMedia) {
			video.mozSrcObject = stream;
		} else {
			var vendorURL = window.URL || window.webkitURL;
			video.src = vendorURL.createObjectURL(stream);
		}
		video.play();
	},
	function(err) {
		console.log("An error occured! " + err);
	}
	);

	video.addEventListener('canplay', function(ev){
		if (!streaming) {
			height = video.videoHeight / (video.videoWidth/width);
			video.setAttribute('width', width);
			video.setAttribute('height', height);
			canvas.setAttribute('width', width);
			canvas.setAttribute('height', height);
			streaming = true;
		}
	}, false);

	function takepicture(callback) {
		canvas.width = width;
		canvas.height = height;
		canvas.getContext('2d').drawImage(video, 0, 0, width, height);

		// By default base64, no conversion needed
		var data = canvas.toDataURL('image/png');
		photo.setAttribute('src', data);

		console.log(data)
		callback(data)
	}

	startbutton.addEventListener('click', function(ev){
		takepicture(sendImage);

		ev.preventDefault();
	}, false);	
}

main()