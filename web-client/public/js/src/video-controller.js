import VideoView from './video-view';

/**
* The video controller class has the responsability to delegate events to the 
* VideoView.
*/
export default class VideoController {
	constructor() {
		this.videoView = new VideoView('video');
	}

	initStream() {
		// Makes sure navigatore.getUserMedia is browser independant
		navigator.getMedia = ( 
			navigator.getUserMedia ||
			navigator.webkitGetUserMedia ||
			navigator.mozGetUserMedia ||
			navigator.msGetUserMedia
			);

		navigator.getMedia(
		{
			video: true,
			audio: false
		},
		(stream) => { this._handleStream(stream); },
		(err) => { console.log("An error occured! " + err); }
		);

		this.videoView.display();
	}

	stopStream() {
		this.videoView.stop();
		this.videoView.hide();
	}

	_handleStream(stream) {
		// Setup video stream
		this.videoView.setStreamSrc(stream, (!!navigator.mozGetUserMedia));

		this.videoView.play();
	}
}
