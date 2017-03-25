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
				this.domReadyCallback();
			});

		// hidden by default
		this.detailsView.hide();
	}

	showMore(template) {
		this.detailsView.display(template, this.analysedCategories);
	}

	hideResults() {
		this.detailsView.hide();
	}

	sendRequest(analysedCategories, domReadyCallback) {
		this.analysedCategories = analysedCategories;
		this.domReadyCallback = domReadyCallback;
		this.templateRequest.sendRequest();
	}
}
