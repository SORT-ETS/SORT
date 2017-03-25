'use-scrict';

/**
* Analysis class wraps a standard JS object and exposes methods to access
* specific parameters
*/
export default class Analysis {
	constructor(analysisObject) {
		// Good pattern for extending objects
		// Object.assign(this, analysisObject);
		Object.assign(this, {
			residues: [
			{
				boundaries: [353, 859, 537, 613],
				category: 'metal',
				displayName: 'Objet 1',
				name: 'obj_1',
				notes: [
				"Saviez vous que l'aluminium est recyclable a 99"
				],
				warnings: [
				"Veuillez verifier de bien vider le contenu du sac dans les poubelles appropriees."
				]
			},
			{
				boundaries: [363, 859, 547, 613],
				category: 'trash',
				displayName: 'Objet 2',
				name: 'obj_2',
				notes: [
				"Saviez vous que l'aluminium est recyclable a 99"
				]
			},
			{
				boundaries: [373, 859, 557, 613],
				category: 'paper',
				displayName: 'Objet 3',
				name: 'obj_3',
				notes: [
				"Saviez vous que l'aluminium est recyclable a 99"
				]
			},
			{
				boundaries: [383, 859, 567, 613],
				category: 'compost',
				displayName: 'Objet 4',
				name: 'obj_4',
				notes: [
				"Saviez vous que l'aluminium est recyclable a 99"
				]
			},
			{
				boundaries: [393, 859, 577, 613],
				category: 'compost',
				displayName: 'Objet 5',
				name: 'obj_5',
				notes: [
				"Saviez vous que l'aluminium est recyclable a 99"
				]
			}

			]
		});
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
				'warning': residue.warning,
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
		categories.warnings = this.residues.find(
			function(item){
				return !!item.warnings;
			}).warnings[0];

		return categories;
	}

	getCategoriesAndItems() {
		var data = {};

		data.categories = this.getCategoriesCount();

		data.residues = this.residues;

		return data;
	}
}
