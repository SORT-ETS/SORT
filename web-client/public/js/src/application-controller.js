import VideoController from './video-controller';
import ImageController from './image-controller';

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

			if(this.videoController.isStreaming) {
				this.imageController.setImage(this.videoController.getVideo());
				this.videoController.stopStream();
			}		
		}, false);
	}
}
