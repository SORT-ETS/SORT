'use-scrict';

import DetailsView from './details-view';
import TemplateRequest from './template-request';

/**
* Results controller class
* Must display or hide results section and delegate data.
*/
export default class DetailsController {
	constructor() {
		this.detailsView = new DetailsView('details');
		this.templateRequest = new TemplateRequest('/templates/details.hbs',
			(template) => {
				this.showMore(template);
			});

		// hidden by default
		this.detailsView.hide();
	}

	showMore(template) {
		console.trace('TEMP',template)
		this.detailsView.display(template);
	}

	hideResults() {
		this.detailsView.hide();
	}

	sendRequest() {
		this.templateRequest.sendRequest();
	}
}
