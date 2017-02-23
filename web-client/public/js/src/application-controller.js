import VideoController from './video-controller';
import ImageController from './image-controller';

import AnalysisRequest from './analysis-request';

/**
* Application controller class
*/
export default class ApplicationController {
	constructor() {
		this.videoController = new VideoController();
		this.imageController = new ImageController();

		this.pictureButton = document.getElementById('pictureButton');
	}

	initApp() {
		this.videoController.initStream();

		this._handleInteractions();
	}

	_handleInteractions() {
		this.pictureButton.addEventListener('click', (event) => {
			event.preventDefault();
			// This button is only present when streaming and user to trigger
			// analysys
			if(this.videoController.isStreaming) {
				this._analyseImage();
			}		
		}, false);
	}

	_analyseImage() {
		// Must set image before stopping stream otherwise nothing visible
		this.imageController.setImage(this.videoController.getVideo());
		this.videoController.stopStream();

		var imageData = this.imageController.getImageData();
		var analysis = new AnalysisRequest(imageData);
	}
}
