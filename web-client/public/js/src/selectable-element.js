'use-scrict';



export default class SelectableElement {
	
	constructor(DOMElement){
		
		this.element = DOMElement;
		
		var upCandidate = DOMElement.getAttribute("upNeighbor");
		this.upNeightbor = (upCandidate !== undefined)? document.getElementById(upCandidate) : undefined ;
		
		var rightCandidate = DOMElement.getAttribute("rightNeighbor");
		this.rightNeightbor = (rightCandidate !== undefined)? document.getElementById(rightCandidate) : undefined ;
		
		var downCandidate = DOMElement.getAttribute("downNeighbor");
		this.downNeightbor = (downCandidate !== undefined)? document.getElementById(downCandidate) : undefined ;
		
		var leftCandidate = DOMElement.getAttribute("leftNeighbor");
		this.leftNeightbor = (leftCandidate !== undefined)? document.getElementById(leftCandidate) : undefined ;
	}
}