'use-scrict';

/**
* HTTP GET request wrapper. It sends the provided data as in the requests body
*/
export default class ResultsRequest {

	constructor(readyCallback) {
		// Wrapping XMLHttpRequest, because cannot be extended...
		this._this = new XMLHttpRequest();

		this.readyCallback = readyCallback;

		this._handleCallbacksDelegation();
	}

	sendRequest() {
		this._this.open("GET", "/templates/results.hbs", true);
		this._this.setRequestHeader("Content-type", "application/json");
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
