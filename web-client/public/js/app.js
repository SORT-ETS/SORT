(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _applicationController = require("./src/application-controller");

var _applicationController2 = _interopRequireDefault(_applicationController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function (event) {
	// Setup app - MAIN
	var applicationController = new _applicationController2.default();

	applicationController.initApp();
}); // function sendImage(data) {
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

},{"./src/application-controller":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// HTTP Post request wrapper. It sends the provided data as in the requests body
var AnalysisRequest = function AnalysisRequest(imageData) {
	var _this = this;

	_classCallCheck(this, AnalysisRequest);

	this.request = new XMLHttpRequest();

	this.type = 'POST';
	this.path = '/api/image';

	this.request.onreadystatechange = function () {
		if (_this.readyState == 4 && _this.status == 200) {
			// This scope will change as the API evolves to new features
			document.getElementById('processed-image').setAttribute('src', "data:image/png;base64," + _this.request.responseText);
		}
	};

	this.request.open(this.type, this.path, true);
	this.request.setRequestHeader("Content-type", "application/json");
	this.request.send('{ "image": "' + this.imageData + '" }');
}

// methods
;

exports.default = AnalysisRequest;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _videoController = require('./video-controller');

var _videoController2 = _interopRequireDefault(_videoController);

var _imageController = require('./image-controller');

var _imageController2 = _interopRequireDefault(_imageController);

var _analysisRequest = require('./analysis-request');

var _analysisRequest2 = _interopRequireDefault(_analysisRequest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* Application controller class
*/
var ApplicationController = function () {
	function ApplicationController() {
		_classCallCheck(this, ApplicationController);

		this.videoController = new _videoController2.default();
		this.imageController = new _imageController2.default();

		this.pictureButton = document.getElementById('pictureButton');
	}

	_createClass(ApplicationController, [{
		key: 'initApp',
		value: function initApp() {
			this.videoController.initStream();

			this._handleInteractions();
		}
	}, {
		key: '_handleInteractions',
		value: function _handleInteractions() {
			var _this = this;

			this.pictureButton.addEventListener('click', function (event) {
				event.preventDefault();
				// This button is only present when streaming and user to trigger
				// analysys
				if (_this.videoController.isStreaming) {
					_this._analyseImage();
				}
			}, false);
		}
	}, {
		key: '_analyseImage',
		value: function _analyseImage() {
			// Must set image before stopping stream otherwise nothing visible
			this.imageController.setImage(this.videoController.getVideo());
			this.videoController.stopStream();

			var imageData = this.imageController.getImageData();
			var analysis = new _analysisRequest2.default(imageData);
		}
	}]);

	return ApplicationController;
}();

exports.default = ApplicationController;

},{"./analysis-request":2,"./image-controller":4,"./video-controller":6}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _imageView = require('./image-view');

var _imageView2 = _interopRequireDefault(_imageView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* Image controller class
*/
var ImageController = function () {
	function ImageController() {
		_classCallCheck(this, ImageController);

		this.imageView = new _imageView2.default('image-canvas');

		// hidden by default
		this.imageView.hide();
	}

	_createClass(ImageController, [{
		key: 'setImage',
		value: function setImage(video) {
			this.imageView.display();
			this.imageView.setImage(video);
		}
	}, {
		key: 'getImageData',
		value: function getImageData() {
			return this.imageView.getData();
		}
	}]);

	return ImageController;
}();

exports.default = ImageController;

},{"./image-view":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _view = require('./view');

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* The image view class reprensents the image data and its representation in the
* DOM. The image data is taken from a video DOM object when an analysis request
* is made.
*/
var ImageView = function (_View) {
	_inherits(ImageView, _View);

	function ImageView(domId) {
		_classCallCheck(this, ImageView);

		var _this = _possibleConstructorReturn(this, (ImageView.__proto__ || Object.getPrototypeOf(ImageView)).call(this, domId));

		_this.domElement = document.getElementById(_this.domId);
		_this.base64Data = '';
		return _this;
	}

	_createClass(ImageView, [{
		key: 'display',
		value: function display() {
			this.domElement.parentNode.style.display = 'block';
		}
	}, {
		key: 'hide',
		value: function hide() {
			this.domElement.parentNode.style.display = 'none';
		}
	}, {
		key: 'setImage',
		value: function setImage(videoElement) {
			// Could get videoWith or height, but as they are never set we 
			// rely on the dom's element dimensions
			var width = videoElement.offsetWidth;
			var height = videoElement.offsetHeight;

			this.domElement.width = width;
			this.domElement.height = height;
			this.domElement.getContext('2d').drawImage(videoElement, 0, 0, width, height);

			// By default base64, no conversion needed
			this.base64Data = this.domElement.toDataURL('image/png');
		}
	}, {
		key: 'getData',
		value: function getData() {
			return this.base64Data;
		}
	}]);

	return ImageView;
}(_view2.default);

exports.default = ImageView;

},{"./view":8}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _videoView = require('./video-view');

var _videoView2 = _interopRequireDefault(_videoView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* The video controller class has the responsability to delegate events to the 
* VideoView.
*/
var VideoController = function () {
	function VideoController() {
		_classCallCheck(this, VideoController);

		this.videoView = new _videoView2.default('video');
		this.isStreaming = false;
	}

	_createClass(VideoController, [{
		key: 'initStream',
		value: function initStream() {
			var _this = this;

			// Makes sure navigatore.getUserMedia is browser independant
			navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

			navigator.getMedia({
				video: true,
				audio: false
			}, function (stream) {
				_this._handleStream(stream);
			}, function (err) {
				console.log("An error occured! " + err);
			});

			this.videoView.display();

			this.isStreaming = true;
		}
	}, {
		key: 'stopStream',
		value: function stopStream() {
			this.videoView.stop();
			this.videoView.hide();

			// Stop the getMedia execution
			this.videoSteam.getTracks()[0].stop();

			this.isStreaming = false;
		}
	}, {
		key: 'getVideo',
		value: function getVideo() {
			return this.videoView.getDomElement();
		}
	}, {
		key: '_handleStream',
		value: function _handleStream(stream) {
			this.videoSteam = stream;

			// Setup video stream
			this.videoView.setStreamSrc(this.videoSteam, !!navigator.mozGetUserMedia);

			this.videoView.play();
		}
	}]);

	return VideoController;
}();

exports.default = VideoController;

},{"./video-view":7}],7:[function(require,module,exports){
'use strict';
'use-scrict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _view = require('./view');

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
* The video view wraps the video DOM object and handles it settings and methods.
*/
var VideoView = function (_View) {
	_inherits(VideoView, _View);

	function VideoView(domId) {
		_classCallCheck(this, VideoView);

		var _this = _possibleConstructorReturn(this, (VideoView.__proto__ || Object.getPrototypeOf(VideoView)).call(this, domId));

		_this.domElement = document.getElementById(_this.domId);
		return _this;
	}

	_createClass(VideoView, [{
		key: 'display',
		value: function display() {
			this.domElement.parentNode.style.display = 'block';
		}
	}, {
		key: 'hide',
		value: function hide() {
			this.domElement.parentNode.style.display = 'none';
		}
	}, {
		key: 'play',
		value: function play() {
			this.domElement.play();
		}
	}, {
		key: 'stop',
		value: function stop() {
			this.domElement.pause();
		}
	}, {
		key: 'getDomElement',
		value: function getDomElement() {
			return this.domElement;
		}
	}, {
		key: 'setStreamSrc',
		value: function setStreamSrc(streamObj, isNavMoz) {
			// Sets the stream source on the DOM element

			if (isNavMoz) {
				// Moz can use the stream directly
				this.domElement.mozSrcObject = streamObj;
			} else {
				// Webkit and opera need to wrap it in a URL
				var vendorURL = window.URL || window.webkitURL;
				this.domElement.src = vendorURL.createObjectURL(streamObj);
			}
		}
	}]);

	return VideoView;
}(_view2.default);

exports.default = VideoView;

},{"./view":8}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* Abstract class, meant to expose rules and common behaviour for concrete
* implementations.
*
* As suggested in this thread :
* http://stackoverflow.com/questions/30559225/how-to-create-abstract-base-class-in-javascript-that-cant-be-instantiated
*/
var View = function View(domId) {
  _classCallCheck(this, View);

  this.domId = domId;

  if (this.display === undefined) throw new TypeError("Must override display method");

  if (this.hide === undefined) throw new TypeError("Must override hide method");
};

exports.default = View;

},{}]},{},[1]);
