import LoaderView from './loader-view';

/**
* Loader controller class
*/
export default class LoaderController {
	constructor() {
		this.loaderView = new LoaderView('loader');

		// hidden by default
		this.loaderView.hide();
	}

	startLoading() {
		this.loaderView.display();
	}

	stopLoading() {
		this.loaderView.hide();
	}
}
