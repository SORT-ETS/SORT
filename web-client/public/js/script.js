// function sendImage(data) {
// 	// HTTP Post request wrapper. It sends the provided data as in the requests body
// 	var xhttp = new XMLHttpRequest();

// 	xhttp.onreadystatechange = function() {
// 		if (this.readyState == 4 && this.status == 200) {
// 			document.getElementById('processed').setAttribute('src', "data:image/png;base64,"+xhttp.responseText);
// 		}
// 	};

// 	xhttp.open("POST", "/api/image", true);
// 	xhttp.setRequestHeader("Content-type", "application/json");
// 	xhttp.send('{ "image": "'+ data +'" }');
// }

// // Inspired by :
// // https://developer.mozilla.org/fr/docs/WebRTC/Prendre_des_photos_avec_la_webcam
// function main() {

// 	var streaming = false;
// 	var video = document.querySelector('#video');
// 	var canvas = document.querySelector('#canvas');
// 	var pictureButton = document.querySelector('#pictureButton');
// 	var width = 320;
// 	var height = 0;


// 	video.addEventListener('canplay', function(ev){
// 		if (!streaming) {
// 			height = video.videoHeight / (video.videoWidth/width);

// 			video.setAttribute('width', width);
// 			video.setAttribute('height', height);

// 			canvas.setAttribute('width', width);
// 			canvas.setAttribute('height', height);

// 			streaming = true;
// 		}
// 	}, false);

// 	function takePicture(callback) {
// 		// Draws video frame into cavas
// 		canvas.width = width;
// 		canvas.height = height;
// 		canvas.getContext('2d').drawImage(video, 0, 0, width, height);

// 		// By default base64, no conversion needed
// 		var data = canvas.toDataURL('image/png');

// 		// After drawing image, send canvas pixel to callback
// 		callback(data)
// 	}

// }

import ApplicationController from './src/application-controller';

document.addEventListener("DOMContentLoaded", function(event) {
	// Setup app - MAIN
	var applicationController = new ApplicationController();

	applicationController.initApp();
});
