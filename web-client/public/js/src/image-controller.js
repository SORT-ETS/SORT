'use-scrict';

import ImageView from './image-view';

/**
* Image controller class
* Must display or hide results image canvas. Allows drawing ovelay according to
* analysis data.
*/
export default class ImageController {
	constructor() {
		this.imageView = new ImageView('image-canvas');

		// hidden by default
		this.imageView.hide();
	}

	setImage(video) {
		this.imageView.display();
		this.imageView.setImage(video);
	}

	setImageOverlay(borders) {
		this.imageView.setOverlay(borders);
	}

	hideImage() {
		this.imageView.hide();
	}

	getImageData() {
		return this.imageView.getData();
	}
}
