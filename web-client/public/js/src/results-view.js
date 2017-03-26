'use-scrict';

import View from './view';
import Handlebars from 'handlebars';

/**
* Results view
* Generates HTML using handlebars according to analysis data.
*/
export default class ResultsView extends View {
	constructor(domId, parentId=undefined) {
		super(domId, parentId);

		this.domElement = document.getElementById(this.domId);
	}

	display(resultsTemplate, analysedCategories) {
		this.domElement.style.display = 'block';

		var resultsHTML = this._compileHandlebarsSection(resultsTemplate, analysedCategories);

		this.domElement.innerHTML = resultsHTML;
	}

	hide() {
		this.domElement.style.display = 'none';
	}

	_compileHandlebarsSection(template, data) {
		return Handlebars.compile(template)(data);
	}

}
