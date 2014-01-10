collabrunner
============

Node runner for continuously evaluating POSTed js code from collabedit

### How this works
Quite simply, the node server just listens for `text/plain` JavaScript code that is sent to it through an HTTP POST.
[CORS](https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS) allows these to be sent across domains so that this can work from any origin.

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
	
	// Parse/strip if needed. For example, you can strip everything outside of the delimiters "//CODE_START" and "//CODE_END"

	// Dispatch
	dispatch('http://localhost:3000', text);
}
```