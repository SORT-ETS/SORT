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
		this._this.open("POST", "/api/image", true);
		this._this.setRequestHeader("Content-type", "application/json");
		this._this.send('{ "image": "'+ imageData +'" }');
	}

	_handleCallbacksDelegation() {
		this._this.onreadystatechange = () => {
			if(this._this.readyState == 1) {
				// Request openned, start loading
				this.loadingCallback();
			}

			if(this._this.readyState == 4) {
				// Rest done, ready
				this.readyCallback();
			}
			// if (this.readyState == 4 && this.status == 200) {
			// 	// This scope will change as the API evolves to new features
			// 	// document.getElementById('processed-image').setAttribute('src', "data:image/png;base64," + this._this.responseText);
			// 	// this.readyCallback();
			// } else {
			// 	// throw new Error('Analysis request error');
			// }
		};
	}
}