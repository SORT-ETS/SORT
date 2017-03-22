'use-scrict';

import View from './view';
import Handlebars from 'handlebars';

/**
* Details view
* Generates HTML using handlebars according to analysis data.
*/
export default class DetailsView extends View {
	constructor(domId) {
		super(domId);

		this.domElement = document.getElementById(this.domId);
	}

	display(detailsTemplate) {
		this.domElement.style.display = 'block';

		var detailsHTML = this._compileHandlebarsSection(detailsTemplate, {});

		this.domElement.innerHTML = detailsHTML;
	}

	hide() {
		this.domElement.style.display = 'none';
	}

	_compileHandlebarsSection(template, data) {
		return Handlebars.compile(template)(data);
	}

}
