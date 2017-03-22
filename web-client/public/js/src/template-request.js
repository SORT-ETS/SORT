'use-scrict';

/**
* HTTP GET request wrapper. It is used to get Handlebars tempaltes through AJAX
*/
export default class TemplateRequest {

	constructor(path, readyCallback) {
		// Wrapping XMLHttpRequest, because cannot be extended...
		this._this = new XMLHttpRequest();

		this.path = path;

		this.readyCallback = readyCallback;

		this._handleCallbacksDelegation();
	}

	sendRequest() {
		this._this.open("GET", this.path, true);
		this._this.send();
	}

	_handleCallbacksDelegation() {
		this._this.onreadystatechange = () => {
			if(this._this.readyState == 4) {
				// Rest done, ready
				this.readyCallback(this._this.responseText);
			}
		};
	}
}
