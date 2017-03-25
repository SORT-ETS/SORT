'use-scrict';

/**
* HTTP Post request wrapper. It sends the provided data as in the requests body
*/
export default class AnalysisRequest {

	constructor(loadingCallback, readyCallback) {
		// Wrapping XMLHttpRequest, because cannot be extended...
		this._this = new XMLHttpRequest();

		this.loadingCallback = loadingCallback;
		this.readyCallback = readyCallback;

		this._handleCallbacksDelegation();
	}

	sendRequest(imageData) {
		// this._this.open("POST", "/api/image", true);
		// this._this.setRequestHeader("Content-type", "application/json");
		// this._this.send('{ "image": "'+ imageData +'" }');

		this.readyCallback({});
	}

	_handleCallbacksDelegation() {
		this._this.onreadystatechange = () => {
			if(this._this.readyState == 1) {
				// Request openned, start loading
				this.loadingCallback();
			}

			if(this._this.readyState == 4) {
				// Rest done, ready
				// if (this.readyState == 4 && this.status == 200) {
				this.readyCallback(JSON.parse(this._this.responseText));

			}
		};
	}
}
