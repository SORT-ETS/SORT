'use-scrict';

import SelectableElement from './selectable-element';

/**
* A wrapper class for DOM elements so you can select them with the keyboard
*/
export default class NavigationController {
	
	constructor() {
		var elem = document.querySelector(".selectable");
		this.selectedElem = new SelectableElement(elem);
	}
	
	select(direction){
		switch(direction){
			case "up":
			this.selectedElem = new SelectableElement(selectedElem.upNeightbor);
			break;
			case "right":
			this.selectedElem = new SelectableElement(selectedElem.rightNeightbor);
			break;
			case "down":
			this.selectedElem = new SelectableElement(selectedElem.downNeightbor);
			break;
			case "left":
			this.selectedElem = new SelectableElement(selectedElem.leftNeightbor);
			break;
		}
		
		
		this.selectedElem.element.style.backgroundColor = "#FDFF47";
	}
	
	
}
