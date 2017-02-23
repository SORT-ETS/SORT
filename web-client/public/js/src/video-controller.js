import VideoView from './video-view';

/**
* The video controller class has the responsability to delegate events to the 
* VideoView.
*/
export default class VideoController {
	constructor() {
		this.videoView = new VideoView('video');
		this.isStreaming = false;
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

		this.isStreaming = true;
	}

	stopStream() {
		this.videoView.stop();
		this.videoView.hide();

		// Stop the getMedia execution
		this.videoSteam.getTracks()[0].stop();

		this.isStreaming = false;
	}
	
	getVideo() {
		return this.videoView.getDomElement();
	}

	_handleStream(stream) {
		this.videoSteam = stream;

		// Setup video stream
		this.videoView.setStreamSrc(this.videoSteam, (!!navigator.mozGetUserMedia));

		this.videoView.play();
	}
}
