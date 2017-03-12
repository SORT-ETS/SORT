import View from './view';

/**
* The home view featuring the instruction card
*/
export default class HomeView extends View {
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
