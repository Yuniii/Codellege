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
    // GET CLASS NAME
    var code = req.body.code;
    code = code.replace(/ /g, '');
    var getName = code.match("class(.*){p");

    var className = getName[1],
        path = __dirname + '/' + id + '/',
        javaFile = path + className + '.java',
	classFile = path + className + '.class';

    if ( ! fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
    if (fs.existsSync(javaFile)) {
        fs.unlinkSync(javaFile);
    }
    fs.writeFileSync(javaFile, req.body.code);

    exec('docker run --name=' + id + ' -e "name=' + className + '" -v ' + path + ':/home derrickh/codellege:mount3', function (err, stdout, stderr) {
	res.send(stdout);
    });
    // REMOVE CONTAINER AFTER ONE MINUTE
    setTimeout(function() {
        exec('docker stop ' + id, function() {
	    exec('docker rm ' + id);	
	});
	// REMOVE USER'S CODE ON THE SERVER
	fs.unlinkSync(javaFile);
        if (fs.existsSync(javaFile)) {
	    fs.unlinkSync(javaFile);
	}
	if (fs.existsSync(classFile)) {
	    fs.unlinkSync(classFile);
	}
	fs.rmdirSync(path);
    }, 60000);
});

console.log('port: ' + port);
app.listen(port);
