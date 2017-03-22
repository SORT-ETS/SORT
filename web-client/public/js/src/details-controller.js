'use-scrict';

import DetailsView from './details-view';
import TemplateRequest from './template-request';

/**
* Results controller class
* Must display or hide results section and delegate data.
*/
export default class DetailsController {
	constructor() {
		this.resultsView = new DetailsView('details');
		this.templateRequest = new TemplateRequest('/templates/details.hbs',
			(template) => {
				this.showMore(template);
			});

		// hidden by default
		this.resultsView.hide();
	}

	showMore(template) {
		console.log(template)
		this.resultsView.display(template);
	}

	hideResults() {
		this.resultsView.hide();
	}

	sendRequest() {
		this.templateRequest.sendRequest();
	}
}
