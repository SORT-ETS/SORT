(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _image = require('./src/image.js');

var _image2 = _interopRequireDefault(_image);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var image = new _image2.default();
console.log(image.data);

function sendImage(data) {
	// HTTP Post request wrapper. It sends the provided data as in the requests body
	var xhttp = new XMLHttpRequest();

	xhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById('processed').setAttribute('src', "data:image/png;base64," + xhttp.responseText);
		}
	};

	xhttp.open("POST", "/api/image", true);
	xhttp.setRequestHeader("Content-type", "application/json");
	xhttp.send('{ "image": "' + data + '" }');
}

// Inspired by :
// https://developer.mozilla.org/fr/docs/WebRTC/Prendre_des_photos_avec_la_webcam
function main() {

	var streaming = false;
	var video = document.querySelector('#video');
	var canvas = document.querySelector('#canvas');
	var pictureButton = document.querySelector('#pictureButton');
	var width = 320;
	var height = 0;

	navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

	navigator.getMedia({
		video: true,
		audio: false
	}, function (stream) {
		// Setup video stream
		if (navigator.mozGetUserMedia) {
			video.mozSrcObject = stream;
		} else {
			var vendorURL = window.URL || window.webkitURL;
			video.src = vendorURL.createObjectURL(stream);
		}
		video.play();
	}, function (err) {
		console.log("An error occured! " + err);
	});

	video.addEventListener('canplay', function (ev) {
		if (!streaming) {
			height = video.videoHeight / (video.videoWidth / width);

			video.setAttribute('width', width);
			video.setAttribute('height', height);

			canvas.setAttribute('width', width);
			canvas.setAttribute('height', height);

			streaming = true;
		}
	}, false);

	function takePicture(callback) {
		// Draws video frame into cavas
		canvas.width = width;
		canvas.height = height;
		canvas.getContext('2d').drawImage(video, 0, 0, width, height);

		// By default base64, no conversion needed
		var data = canvas.toDataURL('image/png');

		// After drawing image, send canvas pixel to callback
		callback(data);
	}

	pictureButton.addEventListener('click', function (event) {
		event.preventDefault();

		// Take a picture and send image as a callback
		takePicture(sendImage);
	}, false);
}

document.addEventListener("DOMContentLoaded", function (event) {
	// Setup app
	main();
});

},{"./src/image.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* Image class
*/
var Image = function Image() {
	_classCallCheck(this, Image);

	console.log('TEST');
	this.data = 10;
};

exports.default = Image;

},{}]},{},[1]);
