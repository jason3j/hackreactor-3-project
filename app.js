
// This file is used for heroku
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

// This console.log here to test to make sure the at least part of the
// file was loaded and can later be checked in the logs
console.log("hey");
app.use(express.static('public'));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
