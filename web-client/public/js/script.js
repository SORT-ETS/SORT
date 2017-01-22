var xmlHttp = new XMLHttpRequest();
xmlHttp.open( "GET", '/api/', false ); // false for synchronous request
xmlHttp.send( null );

var element = document.getElementById("serverVersion");
element.innerHTML = "The current version of the server is " + JSON.parse(xmlHttp.responseText).version;
