'use-scrict';

import ResultsView from './results-view';

/**
* Results controller class
* Must display or hide results section and delegate data.
*/
export default class ResultsController {
	constructor() {
		this.resultsView = new ResultsView('results');

		// hidden by default
		this.resultsView.hide();
	}

	showResults(results) {
		this.resultsView.display(results);
	}

	hideResults() {
		this.resultsView.hide();
	}
}
