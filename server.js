var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var multer = require('multer');

app.use('/assignments', express.static(__dirname + '/assignments'));
app.use(bodyParser.json());
app.use(multer());


var courses = [
    { name: "Java 101", category: "PROG", dateCreated: "1/1/2015", description: "Wow" },
    { name: "MongoDB 101", category: "DB", dateCreated: "2/1/2015", description: "Good" },
    { name: "Express 101", category: "PROG", dateCreated: "3/1/2015", description: "Better" },
    { name: "AngularJS 101", category: "WEB", dateCreated: "4/1/2015", description: "Best" },
    { name: "NodeJS 101", category: "PROG", dateCreated: "5/1/2015", description: "Awesome" }
];

app.get('/api/course', function (req, res) {
    res.json(courses);
});

app.get('/api/course/:index', function (req, res) {
    res.json(courses[req.params.index]);
});

app.delete('/api/course/:index', function (req, res) {
    courses.splice(req.params.index, 1);
    res.json(courses);
});

app.put('/api/course/:index', function (req, res) {
    courses[req.params.index] = req.body;
    res.json(courses);
});

app.post('/api/course', function (req, res) {
    courses.push(req.body);
    res.json(courses);
});

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3030;
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.listen(server_port, server_ip_address);
