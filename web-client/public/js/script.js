var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", '/api/version', false ); // false for synchronous request
xmlHttp.send( null );

var element = document.getElementById("serverVersion");
element.innerHTML = "The current version of the server is " + JSON.parse(xmlHttp.responseText).version;

xmlHttp.open( "GET", '/api/image', false ); // false for synchronous request
xmlHttp.send( null );

var element = document.getElementById("serverApp");
element.innerHTML = "The current response from the server is " + xmlHttp.responseText;
