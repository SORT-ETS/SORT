import ImageView from './image-view';

/**
* Image controller class
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

	getImageData() {
		return this.imageView.getData();
	}
}
