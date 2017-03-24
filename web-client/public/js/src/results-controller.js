'use-scrict';

import ResultsView from './results-view';
import TemplateRequest from './template-request';

/**
* Results controller class
* Must display or hide results section and delegate data.
*/
export default class ResultsController {
	constructor() {
		this.resultsView = new ResultsView('results');


		this.templateRequest = new TemplateRequest('/templates/results.hbs',
			(template) => {
				this.showResults(template);
			});

		// hidden by default
		this.resultsView.hide();
	}

	showResults(template) {
		this.resultsView.display(template, this.analysedCategories);
		this.domReadyCallback();
	}

	hideResults() {
		this.resultsView.hide();
	}

	sendResultsRequest(analysedCategories, domReadyCallback) {
		this.analysedCategories = analysedCategories;
		this.domReadyCallback = domReadyCallback;
		this.templateRequest.sendRequest();
	}
}
