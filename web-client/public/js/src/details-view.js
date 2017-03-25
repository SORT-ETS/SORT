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

	display(detailsTemplate, data, image) {
		this.domElement.style.display = 'block';

		data.residues = this._generateCanvas(data.residues, image);

		var detailsHTML = this._compileHandlebarsSection(detailsTemplate, data);

		this.domElement.innerHTML = detailsHTML;
	}

	hide() {
		this.domElement.style.display = 'none';
	}

	// Computes the individual residue canvasses according to data and image provided
	_generateCanvas(residues, image) {
		for(var i = 0; i < residues.length; i++) {
			var residue = residues[i];
			var x = residue.boundaries[0];
			var width = residue.boundaries[1] - x;
			var y = residue.boundaries[2];
			var height = residue.boundaries[3] - y;

			var canvas = document.createElement('canvas');
			canvas.width = width;
			canvas.height = height;
			var context = canvas.getContext('2d');

			context.drawImage(image, x, y, width, height, 0, 0, width, height);
			residues[i].canvas = canvas.toDataURL();
		}
		return residues;
	}

	_compileHandlebarsSection(template, data) {
		return Handlebars.compile(template)(data);
	}

}
