# collabrunner #

Node runner for continuously evaluating POSTed js code from collabedit

## How this works ##

1. The node server just listens for `text/plain` JavaScript code that is sent to it through an HTTP POST and writes it to `code.js`.
[CORS](https://developer.mozilla.org/en-US/docs/HTTP/Access_control_CORS) allows these to be sent across domains so that this can work from any origin.

2. A `grunt watch` task listens for changes on `code.js`, runs that fine, and pipes `&>` to `out.log`.

3. `server.js` watches `out.log` for changes and uses socket.io to emit the contents to `index.html` which simply dynamically updates it in a `<pre>` block.

## Server ##

Run the server locally: `node server.js`.

Separately start the `grunt watch` task to run the code everytime it detects changes.

I personally run a [localtunnel](http://localtunnel.me) so that whoever I'm collaborating with can also see the output as well.

## Client ##

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
