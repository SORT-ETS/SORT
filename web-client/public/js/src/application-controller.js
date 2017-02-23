import VideoController from './video-controller';
import ImageController from './image-controller';

/**
* Application controller class
*/
export default class ApplicationController {
	constructor() {
		this.videoController = new VideoController();
		this.imageController = new ImageController();
	}

	initApp() {
		this.videoController.initStream();
	}
}
