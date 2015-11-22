var express = require('express'),
    bodyParser = require('body-parser'),
    exec = require('child_process').exec,
    cors = require('cors'),
    shortID = require('shortid');

var app = express();
var port = 8081;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/', function (req, res) {
    var name = shortID.generate();
    exec('docker run --name=' + name + ' -e "code=' + req.body.code + '" derrickh/codellege');
    setTimeout(function () { exec('docker ps --filter "name=' + name + '" --format "{{.Ports}}"', function(err, stdout, stderr) {
	res.send(stdout);
    })}, 1000);
    setTimeout(function() {
        exec('docker stop ' + name, function() {
	    exec('docker rm ' + name);	
	});
    }, 60000);
});

console.log('port: ' + port);
app.listen(port);
