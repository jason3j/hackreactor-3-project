/**
 * Created by JMac on 9/6/15.
 */
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

console.log("hey");
app.use(express.static(__dirname + '/public'));

//app.get('/', function (req, res) {
//    res.send('Hello World!');
//});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

//var server = app.listen(3000, function () {
//    var host = server.address().address;
//    var port = server.address().port;
//
//    console.log('Example app listening at http://%s:%s', host, port);
//});