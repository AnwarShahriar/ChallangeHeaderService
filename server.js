var express = require('express');
var app = express();

app.get('/api/whoami', function (req, res) {
    
    var respJson = {
        ipaddress: req.headers['x-forwarded-for'],
        language: req.headers['accept-language'].split(',')[0],
        software: getSoftware(req.headers['user-agent'])
    };
    
    res.json(respJson); 
});

app.listen(process.env.PORT || 8080, function () {
    console.log('Server is running');
});

function getSoftware(userAgent) {
    var arr = userAgent.split(' ');
    var software = arr[1].slice(1, arr[1].length);
    var os = arr[2].slice(0, arr[2].length);
    var architecture = arr[3].slice(0, arr[3].length - 1);
    return software + ' ' + os + ' ' + architecture;
}