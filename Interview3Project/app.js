/**
 * Created by JMac on 9/6/15.
 */
var express = require('express');
var app = express();
console.log("hey");
app.use(express.static('public'));

//app.get('/', function (req, res) {
//    res.send('Hello World!');
//});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});