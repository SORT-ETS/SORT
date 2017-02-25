'use-scrict';

import View from './view';

/**
* The image view class reprensents the image data and its representation in the
* DOM. The image data is taken from a video DOM object when an analysis request
* is made.
*/
export default class ImageView extends View {
	constructor(domId) {
		super(domId);

		this.domElement = document.getElementById(this.domId);
		this.base64Data = '';
	}

	display() {
		this.domElement.parentNode.style.display = 'block';
	}

	hide() {
		this.domElement.parentNode.style.display = 'none';
	}

	setImage(videoElement) {
		// Could get videoWith or height, but as they are never set we 
		// rely on the dom's element dimensions
		var width = videoElement.offsetWidth;
		var height = videoElement.offsetHeight;


		this.domElement.width = width;
		this.domElement.height = height;
		this.domElement.getContext('2d').drawImage(videoElement, 0, 0, 
			width, height);

		// By default base64, no conversion needed
		this.base64Data = this.domElement.toDataURL('image/png');
	}

	setOverlay(borders) {
		console.log('Display borders', borders);
	}

	getData() {
		return this.base64Data;
	}
	
}