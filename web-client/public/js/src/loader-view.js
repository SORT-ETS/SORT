'use-scrict';

import View from './view';

/**
* Loader view
*/
export default class LoaderView extends View {
	constructor(domId, parentId) {
		super(domId, parentId);

		this.parentSection = document.getElementById(this.parentId);
	}

	display() {
		this.parentSection.style.display = 'block';
	}

	hide() {
		this.parentSection.style.display = 'none';
	}
}
