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

	setOverlay(boundaries) {
		
		var context = this.domElement.getContext('2d');
		boundaries.forEach(function(item){
			var x = item.boundaries[0];
			var width = item.boundaries[1] - x;
			var y = item.boundaries[2];
			var height = item.boundaries[3] - y;
			
			context.beginPath();
			context.lineWidth="2";
			
			switch(item.category) {
				case "recyclable":
				context.strokeStyle="yellow";
				break;
				case "metal":
				context.strokeStyle="blue";
				break;
				case "Composte":
				context.strokeStyle="red";
				break;
				default:
				context.strokeStyle="gray";
			} 
			context.rect(x,y,width,height);
			context.stroke();
		});
		
	}

	getData() {
		return this.base64Data;
	}

}