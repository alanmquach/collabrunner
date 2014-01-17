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

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

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

io.sockets.on('connection', function (socket) {
	// Bookkeeping
	clients[socket.id] = socket;

	// Cleanup
	socket.on('disconnect', function () {
		delete clients[socket.id];
	});

	// Push
	socket.emit('output', { output: 'Ready.' });
});

fs.watch('out.log', function () {
	console.log("Contents changed, reading...");
	fs.readFile('out.log', 'utf8', function (err, data) {
		console.log("Done reading. Publishing...");
		var c, content;
        if (err) {
            content = "Error reading file program output.";
        }
        content = data;

        // Publish
		for (c in clients) {
			clients[c].emit('output', {output: content});
		}
    });
});

server.listen(3000);
