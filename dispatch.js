var

start, end, url;

dispatch = function (code) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-Type', 'text/plain');
	xhr.onreadystatechange = function () {console.dir(arguments);};
	xhr.send(code);
};

// Sample for collabedit
document.getElementById("textarea").onkeyup = function () {
	dispatch(document.getElementById("content_highlight").textContent);
};

start = 5; end = 70;

url = 'https://jrwsymxksu.localtunnel.me/' + (start ? ('?start='+start+(end ? ('&end='+end) : '')) : '');
