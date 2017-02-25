'use-scrict';

import View from './view';
import Handlebars from 'handlebars';


/**
* Results view
* Generates HTML using handlebars according to analysis data.
*/
export default class ResultsView extends View {
	constructor(domId) {
		super(domId);

		this.domElement = document.getElementById(this.domId);
	}

	display(results) {
		this.domElement.style.display = 'block';

		var resultsTemplate = document.getElementById('results-template');
		var resultsHTML = this._compileHandlebarsSection(resultsTemplate.innerHTML, results);
		
		var resultsContainer = document.getElementById('results-container');
		resultsContainer.innerHTML = resultsHTML;
	}

	hide() {
		this.domElement.style.display = 'none';
	}

	_compileHandlebarsSection(template, data) {
		return Handlebars.compile(template)(data);
	}
}