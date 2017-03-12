'use-scrict';

import VideoController from './video-controller';
import ImageController from './image-controller';
import LoaderController from './loader-controller';
import ResultsController from './results-controller';

import AnalysisRequest from './analysis-request';
import Analysis from './analysis';

/**
* Application controller class
*/
export default class ApplicationController {
	constructor() {
		this.videoController = new VideoController();
		this.imageController = new ImageController();
		this.loaderController = new LoaderController();
		this.resultsController = new ResultsController();

		this.pictureButton = document.getElementById('pictureButton');
		this.backButton = document.getElementById('backButton');
	}

	initApp() {
		this.videoController.initStream();

		this._handleInteractions();
	}

	_handleInteractions() {
		this.pictureButton.addEventListener('click', (event) => {
			event.preventDefault();
			// This button is only present when streaming and user to trigger
			// analysys
			if(this.videoController.isStreaming) {
				this._analyseImage();
			}
		}, false);

		this.backButton.addEventListener('click', (event) => {
			event.preventDefault();
			// Triggers back video
			if(!this.videoController.isStreaming) {
				this.imageController.hideImage();
				this.resultsController.hideResults();
				this.videoController.initStream();
			}
		}, false);
	}

	_analyseImage() {
		// Must set image before stopping stream otherwise nothing visible
		this.imageController.setImage(this.videoController.getVideo());
		this.videoController.stopStream();

		var analysisReq = new AnalysisRequest(
			() => {
				// Loading callback
				this.loaderController.startLoading();
			},
			(results) => {
				// Ready callback
				this.loaderController.stopLoading();

				var analysis = new Analysis(results);

				// On result the image must be updated with analysed borders
				this.imageController.setImageOverlay(analysis.getBoundaries());
				// On result the results section must show analysis details
				this.resultsController.showResults(analysis);
			});

		var imageData = this.imageController.getImageData();
		analysisReq.sendRequest(imageData);
	}
}
