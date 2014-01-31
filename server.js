var app = require('express')()
	, server = require('http').createServer(app)
	, io = require('socket.io').listen(server)
	, fs = require('fs')
	, clients = {};

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

// Recieves code via POST and writes it to code.js
app.post('/', function(req, res) {
	var payload = req.text,
	start = req.query.start,
	end = req.query.end;

	// Perform sanitizing/parsing/stripping based on query params start and end
	// i.e. http://localhost:3000/?start=5&end=70
	if (start) {
		payload = payload.split('\n');
		end = end || payload.length;
		payload = payload.splice(start-1, end-start+1);
		payload = (new Array(start-1)).concat(payload);
		payload = payload.join('\n');
	}

	fs.writeFile("code.js", payload, function (err) {
		if (err) {
		    console.log(err);
		} else {
		    console.log("Wrote to code.js.");
		}
	});

	res.send("");
});

// Hosts index.html for seeing output sent in realtime.
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

// Aliasing "code.js" to index.html lets us overload any old web editer to modify code.js and "preview" the output
app.get('/code.js', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

// Socket initialization
io.sockets.on('connection', function (socket) {
	// Bookkeeping
	clients[socket.id] = socket;

	// Cleanup
	socket.on('disconnect', function () {
		delete clients[socket.id];
	});

	// Initial push
	fs.readFile('out.log', 'utf8', function (err, data) {
		var c, content = err ? "Error reading file program output." : data;
		socket.emit('output', {output: content});
    });
});

// Emit the contents of out.log over socket.io
fs.watch('out.log', function () {
	fs.readFile('out.log', 'utf8', function (err, data) {
		var c, content = err ? "Error reading file program output." : data;

        // Publish
		for (c in clients) {
			clients[c].emit('output', {output: content});
		}
    });
});

server.listen(80);

