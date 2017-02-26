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
				'notes': residue.notes
			};
		});
	}
}
