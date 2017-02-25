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
				//Ready callback
				this.loaderController.stopLoading();

				// REPLACE WITH RESULTS ONCE IMPLEMENTED ON API SIDE
				var analysisObj = {
					residues: [ 
					{
						borders : [],
						name: "Residue 1",
						category: "1",
						notes : ["Lorem ipsum Aliquip labore non ea ut laborum laborum anim dolor occaecat.", 
						"Lorem ipsum Deserunt esse sunt mollit anim."]				
					},
					{
						borders : [],
						name: "Residue 2",
						category: "2",
						notes : ["Lorem ipsum Aliquip labore non ea ut laborum laborum anim dolor occaecat.", 
						"Lorem ipsum Deserunt esse sunt mollit anim."]				
					},
					{
						borders : [],
						name: "Residue 3",
						category: "3",
						notes : ["Lorem ipsum Aliquip labore non ea ut laborum laborum anim dolor occaecat.", 
						"Lorem ipsum Deserunt esse sunt mollit anim."]				
					},
					{
						borders : [],
						name: "Residue 4",
						category: "4",
						notes : ["Lorem ipsum Aliquip labore non ea ut laborum laborum anim dolor occaecat.", 
						"Lorem ipsum Deserunt esse sunt mollit anim."]				
					}
					]
				}

				var analysis = new Analysis(analysisObj);

				// On result the image must be updated with analysed borders
				this.imageController.setImageOverlay(analysis.getBorders());
				// On result the restults section must show analysis details
				this.resultsController.showResults(analysis);
			});

		var imageData = this.imageController.getImageData();
		analysisReq.sendRequest(imageData);
	}
}
