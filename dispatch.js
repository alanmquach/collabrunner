var dispatch = function (url, code) {
	var xhr = new XMLHttpRequest();
	xhr.open('POST', url, true);
	xhr.setRequestHeader('Content-Type', 'text/plain');
	xhr.onreadystatechange = function () {console.dir(arguments);};;
	xhr.send(code);
};

// Sample for collabedit
document.getElementById("textarea").onkeyup = function () {dispatch('http://localhost:3000', document.getElementById("content_highlight").textContent);}
