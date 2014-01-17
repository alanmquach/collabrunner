var

start, end, baseurl;

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

start = 0;
end = 0;
baseurl = 'http://localhost:3000';
