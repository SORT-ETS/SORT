'use-scrict';

import ApplicationController from './src/application-controller';

document.addEventListener("DOMContentLoaded", function(event) {
	// Setup app - MAIN
	var applicationController = new ApplicationController();

	applicationController.initApp();
});
