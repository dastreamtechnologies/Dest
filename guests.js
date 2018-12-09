var http = require("http");
var express = require('express');
var app = express();
var mysql      = require('mysql');
var bodyParser = require('body-parser');
//var routes = require('./api/guests');
 
//start mysql connection
var connection = mysql.createConnection({
  host     : 'localhost', //mysql database host name
  user     : 'root', //mysql database user name
  password : 'root', //mysql database password
  database : 'stayhome' //mysql database name
});
 
connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})
//end mysql connection
 
//start body-parser configuration
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
//end body-parser configuration
 
//create app server
var server = app.listen(3000,  "127.0.0.1", function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("Example app listening at http://%s:%s", host, port)
 
});
 
//rest api to get all results
app.get('/guests', function (req, res) {
   connection.query('select * from st_guests', function (error, results, fields) {
   if (error) throw error;
   res.end(JSON.stringify(results));
 });
});

//rest api to create a new record into mysql database
app.post('/guests', function (req, res) {
   var postData  = req.body;
   connection.query('INSERT INTO st_guests SET ?', postData, function (error, results, fields) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});