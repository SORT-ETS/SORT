'use-scrict';

import View from './view';

/**
* Loader view
*/
export default class LoaderView extends View {
	constructor(domId) {
		super(domId);

		this.domElement = document.getElementById(this.domId);
	}

	display() {
		this.domElement.parentNode.style.display = 'block';
	}

	hide() {
		this.domElement.parentNode.style.display = 'none';
	}
}
