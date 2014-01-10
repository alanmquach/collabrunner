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
