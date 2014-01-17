collabrunner
============

Node runner for continuously evaluating POSTed js code from collabedit

### How this works
Quite simply, the node server just listens for `text/plain` JavaScript code that is sent to it through an HTTP POST.
[CORS](https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS) allows these to be sent across domains so that this can work from any origin.

This code is then written to a file `code.js` which can be run automatically with the packaged `grunt watch` task. The task pipes `&>` to `out.log` which is watched by `server.js` who uses socket.io to emit the changes to a page which dynamically displays its contents.

Server
------

Run the server locally: `node server.js`.

Separately start the `grunt watch` task to run the code everytime it detects changes.

I personally run a [localtunnel](http://localtunnel.me) so that whoever I'm collaborating with can also see the output as well.

Client
------

Then in collabedit, or some equivalent, collect the code and dispatch it like so:
```js
var start, end, baseurl;

dispatch = function (code) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', baseurl + '/' + (start ? ('?start='+start+(end ? ('&end='+end) : '')) : ''), true);
	xhr.setRequestHeader('Content-Type', 'text/plain');
	xhr.onreadystatechange = function () {console.dir(arguments);};
	xhr.send(code);
};

// Sample for collabedit
document.getElementById("textarea").onkeyup = function () {
	dispatch(document.getElementById("content_highlight").textContent);
};

start = 0; // first line of desired code (1-indexed)
end = 0; // last line of desired code
baseurl = 'http://localhost:3000';
```
