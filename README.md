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

// Sample for collabedit, don't forget that this needs to be run in the scope of the editor frame (frame_the_input).
document.getElementById("textarea").onkeyup = function () {dispatch('http://localhost:3000', document.getElementById("content_highlight").textContent);}
```