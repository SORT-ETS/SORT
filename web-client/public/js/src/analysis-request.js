// HTTP Post request wrapper. It sends the provided data as in the requests body
export default class AnalysisRequest {
	constructor(imageData) {
		this.request = new XMLHttpRequest();
		
		this.type = 'POST';
		this.path = '/api/image';

		this.request.onreadystatechange = () => {
			if (this.readyState == 4 && this.status == 200) {
				// This scope will change as the API evolves to new features
				document.getElementById('processed-image').setAttribute('src', "data:image/png;base64," + this.request.responseText);
			}
		};

		this.request.open(this.type, this.path, true);
		this.request.setRequestHeader("Content-type", "application/json");
		this.request.send('{ "image": "'+ this.imageData +'" }');
	}

	// methods
}