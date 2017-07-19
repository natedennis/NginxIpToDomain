var express = require('express');
var app = express();
var fs = require("fs");
var dns = require("dns");
var url = require('url');

const options = {
  family: 6,
  hints: dns.ADDRCONFIG | dns.V4MAPPED,
};
app.get('/ptr', function (req, res) {
       
//    console.log("process request");


    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);


    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var ip = req.query.ip;
    dns.reverse(ip, (err, hostnames) => {  
      if (err) {  
//         throw err;  
      }  
      res.end(`${JSON.stringify(hostnames)}`);  
    }); 
})

var server = app.listen(10081, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

})
