import ImageView from './image-view';

/**
* Image controller class
*/
export default class ImageController {
	constructor() {
		this.imageView = new ImageView('image-canvas');
	}
}
