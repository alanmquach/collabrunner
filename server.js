var app = require('express')();

// Plaintext parser: https://gist.github.com/3750227
app.use(function(req, res, next){
  if (req.is('text/*')) {
    req.text = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk){ req.text += chunk });
    req.on('end', next);
  } else {
    next();
  }
});

// CORS headers to allow browser ajax from any origin domain
app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });


app.post('/', function(req, res) {
	var payload = req.text,
	repeat = new Array(80);
	console.log(repeat.join('\n') + "Executing payload:\n" + repeat.join('-'));
	// console.log("Executing payload:\n------------------");
	console.log(payload)
	console.log(repeat.join('-') + "\n\nResult:\n" + repeat.join('='));

	// IIFE to protect scope
	(function (){
		try {
			eval(req.text);
		} catch (e) {
			console.dir(e);
		}
	})();
	// WARNING: This only gives the eval it's own function scope. eval is generally dangerous and all your globals are accessible from the evaluated code.
	// Obviously do not use this in production.

	console.log(repeat.join('='));

	res.send("");
});

app.listen(3000);