'use-scrict';

/**
* Analysis class wraps a standard JS object and exposes methods to access
* specific parameters
*/
export default class Analysis {
	constructor(analysisObject) {
		// Good pattern for extending objects
		Object.assign(this, analysisObject);
	}

	// Analysis abstraction meant to be used by images, does not expose all params
	getBoundaries() {
		return this.residues.map(function(residue) {
			return {
				'boundaries': residue.boundaries,
				'category': residue.category
			};
		});
	}

	// Analysis data meant to be used by textual results section
	getTextualResults() {
		return this.residues.map(function(residue) {
			return {
				'name': residue.displayName,
				'category': residue.category,
				'warnings': residue.warnings,
				'notes': residue.notes
			};
		});
	}

	getCategoriesCount() {
		var categories = {};

		// Count each item belonging to a category
		this.residues.forEach(function(residue) {
			categories[residue.category] = (categories[residue.category] || 0) + 1
		});

		// Count the number of categories and keep in ref the number of columns
		// needed in the 12columns grid system
		// NEEDS TO BE DONE PRIOR TO ADDING MORE members eg.: warning
		switch(Object.keys(categories).length) {
			case 1:
			categories.itemDOMColumns = 'twelve';
			break;
			case 2:
			categories.itemDOMColumns = 'six';
			break;
			case 3:
			categories.itemDOMColumns = 'four';
			break;
			case 4:
			categories.itemDOMColumns = 'three';
			break;
		}

		// Find the first warning to be displayed
		let residue = this.residues.find(function(item){
			return !!item.warnings;
		})

		if (residue != undefined) {
            categories.warnings = residue.warnings[0];
        }

		return categories;
	}

	getCategoriesAndItems() {
		var data = {};

		data.categories = this.getCategoriesCount();

		data.residues = this.residues;

		return data;
	}
}
