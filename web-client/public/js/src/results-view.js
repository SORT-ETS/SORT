'use-scrict';

import View from './view';

/**
* Loader view
*/
export default class ResultsView extends View {
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