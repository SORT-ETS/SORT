'use-scrict';

import View from './view';

/**
* 
*/
export default class VideoView extends View {
	constructor(domId) {
		super(domId);

		this.domElement = document.getElementById(this.domId);
	}

	display() {
		this.domElement.style.display = 'block';
	}

	hide() {
		this.domElement.style.display = 'none';
	}
	
}
