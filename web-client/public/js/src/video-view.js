'use-scrict';

import View from './view';

/**
* The video view wraps the video DOM object and handles it settings and methods.
*/
export default class VideoView extends View {
	constructor(domId, parentId) {
		super(domId, parentId);

		this.domElement = document.getElementById(this.domId);
		this.parentSection = document.getElementById(this.parentId);
	}

	display() {
		this.parentSection.style.display = 'block';
	}

	hide() {
		this.parentSection.style.display = 'none';
	}

	play() {
		this.domElement.play();
	}

	stop() {
		this.domElement.pause();
	}

	getDomElement() {
		return this.domElement;
	}

	setStreamSrc(streamObj, isNavMoz) {
		// Sets the stream source on the DOM element
		if(isNavMoz) {
			// Moz can use the stream directly
			this.domElement.mozSrcObject = streamObj;
		} else {
			// Webkit and opera need to wrap it in a URL
			var vendorURL = window.URL || window.webkitURL;
			this.domElement.src = vendorURL.createObjectURL(streamObj);
		}
	}

}
