'use-scrict';

import VideoController from './video-controller';
import ImageController from './image-controller';
import LoaderController from './loader-controller';
import ResultsController from './results-controller';
import DetailsController from './details-controller';

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
		this.detailsController = new DetailsController();

		this.pictureButton = document.getElementById('pictureButton');
		this.backButton = document.getElementById('backButton');
		this.moreDetailsButton = undefined;
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

		document.addEventListener('keypress', (event) => {
			if (event.keyCode == 13) {
				event.preventDefault();
				// This button is only present when streaming and user to trigger
				// analysys
				if(this.videoController.isStreaming) {
					this._analyseImage();
				}
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
				this.resultsController.sendResultsRequest(analysis.getCategoriesCount(),
					() => {
						// Once ready moreDetailsButton should exist in DOM
						this.moreDetailsButton = document.getElementById('moreDetailsButton');
						console.log(this.moreDetailsButton)
						this.moreDetailsButton.addEventListener('click', (event) => {
							event.preventDefault();

							this.imageController.hideImage();
							this.resultsController.hideResults();
							// Which fetches the template and displays the view
							this.detailsController.sendRequest(analysis.getCategoriesCount(), () => {
								// Can handle anything hapening in the details view
							});
						}, false);
					});


			});

		var imageData = this.imageController.getImageData();
		analysisReq.sendRequest(imageData);
	}
}
