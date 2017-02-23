/**
* Abstract class, meant to expose rules and common behaviour for concrete
* implementations.
*
* As suggested in this thread :
* http://stackoverflow.com/questions/30559225/how-to-create-abstract-base-class-in-javascript-that-cant-be-instantiated
*/
export default class View {
	constructor(domId) {
		this.domId = domId;

		if (this.display === undefined) 
      		throw new TypeError("Must override display method");
    	
    	if (this.hide === undefined)
    		throw new TypeError("Must override hide method");
	}
}