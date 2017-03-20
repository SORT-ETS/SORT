'use-scrict';

import ResultsView from './results-view';
import ResultsRequest from './results-request';

/**
* Results controller class
* Must display or hide results section and delegate data.
*/
export default class ResultsController {
	constructor() {
		this.resultsView = new ResultsView('results', 'moreDetailsButton');
		this.resultsRequest = new ResultsRequest((resultsTemplate) => {
			this.showResults(resultsTemplate);
		});

		// hidden by default
		this.resultsView.hide();
	}

	showResults(resultsTemplate) {
		this.resultsView.display(resultsTemplate, this.analysedCategories);
	}

	hideResults() {
		this.resultsView.hide();
	}

	showMore() {
		this.resultsView.toggleDetails();
	}

	sendResultsRequest(analysedCategories) {
		this.analysedCategories = analysedCategories;
		this.resultsRequest.sendRequest();
	}
}
