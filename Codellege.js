var express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    exec = require('child_process').exec,
    shortID = require('shortid');
    cors = require('cors');

var app = express();
var port = 8081;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

/*app.post('/', function (req, res) {
    var name = shortID.generate();
    exec('docker run --name=' + name + ' -e "code=' + req.body.code + '" derrickh/codellege', function (err, stdout, stderr) {
	res.send(stdout);
    });
    setTimeout(function() {
        exec('docker stop ' + name, function() {
	    exec('docker rm ' + name);	
	});
    }, 60000);
});*/

app.post('/', function (req, res) {
    var id = shortID.generate();

    var className = req.body.code.split('class ')[1].split('{')[0].trim(),
        path = __dirname + '/' + id + '/',
        javaFile = path + className + '.java',
	classFile = path + className + '.class',
	inputFile = path + 'input';

    if ( ! fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
    if (fs.existsSync(javaFile)) {
        fs.unlinkSync(javaFile);
    }
    fs.writeFileSync(javaFile, req.body.code);
    fs.writeFileSync(inputFile, req.body.input);

    exec('docker run --name=' + id + ' -v ' + path + ':/home derrickh/codellege:mount3', function (err, stdout, stderr) {
	res.send(stdout);
    });
    // REMOVE CONTAINER AFTER 10 SECONDS
    setTimeout(function() {
        exec('docker stop ' + id, function() {
	    exec('docker rm ' + id);	
	});
	// REMOVE USER'S CODE ON THE SERVER
	exec('rm -rf ' + path);
    }, 10000);
});

console.log('port: ' + port);
app.listen(port);
