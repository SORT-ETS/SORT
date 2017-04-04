'use-scrict';

import View from './view';

/**
* The image view class reprensents the image data and its representation in the
* DOM. The image data is taken from a video DOM object when an analysis request
* is made.
*/
export default class ImageView extends View {
	constructor(domId, parentId) {
		super(domId, parentId);

		this.domElement = document.getElementById(this.domId);
		this.parentSection = document.getElementById(this.parentId);

		this.base64Data = '';
	}

	display() {
		this.parentSection.style.display = 'block';
	}

	hide() {
		this.parentSection.style.display = 'none';
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

		// As a reference for further use after calling setOverlay
		this.setImageReference();

		// By default base64, no conversion needed
		this.base64Data = this.domElement.toDataURL('image/png');
	}

	setOverlay(boundaries) {

		var context = this.domElement.getContext('2d');
		var textBoxHeight = 42;

		boundaries.forEach(function(item){
			var x = item.boundaries[0];
			var width = item.boundaries[1] - x;
			var y = item.boundaries[2];
			var height = item.boundaries[3] - y;

			context.beginPath();
			context.lineWidth="2";
			context.globalAlpha = 0.8;

			context.strokeStyle = item.color;
			context.fillStyle =  item.color;

			context.rect(x, y -textBoxHeight, width, textBoxHeight);
			context.fillRect(x, y -textBoxHeight, width, textBoxHeight);

			context.font="22px helvetica";
			context.fillStyle = "#fff";
			context.textAlign="center";

			context.fillText(`${item.displayName} (${item.probability})`, x+width /2, y - 18 / 2);

			context.rect(x,y,width,height);
			context.stroke();
		});

	}

	setImageReference() {

    this.imageRef = document.createElement('canvas');
    var context = this.imageRef.getContext('2d');

    //set dimensions
    this.imageRef.width = this.domElement.width;
    this.imageRef.height = this.domElement.height;

    //apply the old canvas to the new one
    context.drawImage(this.domElement, 0, 0);
	}

	getData() {
		return this.base64Data;
	}

	getCanvas() {
		return this.imageRef;
	}

}
