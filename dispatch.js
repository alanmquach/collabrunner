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
