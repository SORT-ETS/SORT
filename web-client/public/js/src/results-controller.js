import ResultsView from './results-view';

/**
* Loader controller class
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
