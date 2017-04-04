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
				this.loaderController.stopLoading();
				this.resultsController.hideResults();
				this.detailsController.hideResults();
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

						this.moreDetailsButton.addEventListener('click', (event) => {
							event.preventDefault();
							
							
							
							this.imageController.hideImage();
							this.resultsController.hideResults();
							// Which fetches the template and displays the view
							this.detailsController.setImage(this.imageController.getImage());
							this.detailsController.sendRequest(analysis.getCategoriesAndItems(),
								() => {
									
									var directions = {
										38:'up',
										40:'bottom',
										37:'prev',
										39:'next'
									};								
									var $selectable = $('.selectable');
									
									
									
									// Can handle anything hapening in the details view
									var detailItems = document.getElementsByClassName('detail-item');

									for(var i = 0; i < detailItems.length; i++) {
										var item = detailItems.item(i);

										item.addEventListener('click', function(event) {
											event.preventDefault();
											var modal = this.getElementsByClassName('modal')[0];

											modal.style.display = "block";
										});
									}

									var exitModalButtons = document.getElementsByClassName('close-modal');		
					
									for(var i = 0; i < exitModalButtons.length; i++) {
										var item = exitModalButtons.item(i);

										item.addEventListener('click', function(event) {
											event.stopPropagation();
											// Three layers top of exit button is .modal
											var parentModal = this.parentNode.parentNode.parentNode;
											parentModal.style.display = "none";
										});
									}
									
									document.addEventListener('keyup', (e) => {
										
										var dir = directions[e.which];									
										var $active = $('.active');
										
										
										if (!$active.length) {
											if (e.which == 13) {
												$(exitModalButtons).trigger("click");
											}
											
											
											$selectable.first().addClass('active');
											return;
										} else {
											
											if (e.which == 13) {
												$(exitModalButtons).trigger("click");
												$active.click();
												$active.removeClass('active');
												return;
											}
											
											if(dir !== undefined){
												var cat = $active.closest('.three.columns');										
												
												if(dir === 'next'){
													cat.next().children('.selectable').first().addClass('active');
												} else if(dir === 'prev'){
													cat.prev().children('.selectable').first().addClass('active');
												} else {
													var i = cat.children('.selectable').index($active);
													var p = dir === 'up' ? (i-1) : (i+1);
													cat.children('.selectable').eq(p).addClass('active');
												}
												
												$active.removeClass('active');
											}
										}
									}, false);

								});
						}, false);
					});


			});

		var imageData = this.imageController.getImageData();
		analysisReq.sendRequest(imageData);
	}
}
