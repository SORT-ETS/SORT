'use-scrict';

import View from './view';
import Handlebars from 'handlebars';

Handlebars.registerHelper('compare', function(param1, param2, opts) {
	// opts to use as if, otherwise will print true or false, delegate the 'this'
	if(param1 === param2)
		return opts.fn(this);
	else
		return opts.inverse(this);
});

/**
* Details view
* Generates HTML using handlebars according to analysis data.
*/
export default class DetailsView extends View {
	constructor(domId) {
		super(domId);

		this.domElement = document.getElementById(this.domId);
	}

	display(detailsTemplate, data) {
		this.domElement.style.display = 'block';

		var detailsHTML = this._compileHandlebarsSection(detailsTemplate, data);

		this.domElement.innerHTML = detailsHTML;
	}

	hide() {
		this.domElement.style.display = 'none';
	}

	_compileHandlebarsSection(template, data) {
		return Handlebars.compile(template)(data);
	}

}
