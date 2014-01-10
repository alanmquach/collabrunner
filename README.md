collabrunner
============

Node runner for continuously evaluating POSTed js code from collabedit

Server
------

Run the server locally: `node server.js`

Client
------

Then in collabedit, or some equivalent, collect the code and dispatch it like so:
```js
var dispatch = function (url, code) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-Type', 'text/plain');
	xhr.onreadystatechange = function () {console.dir(arguments);};;
	xhr.send(code);
};

// Sample for collabedit
document.getElementById("textarea").onkeyup = function () {
	var text = document.getElementById("content_highlight").textContent;
	
	// Parse/strip if needed

	// Dispatch
	dispatch('http://localhost:3000', text);
}
```