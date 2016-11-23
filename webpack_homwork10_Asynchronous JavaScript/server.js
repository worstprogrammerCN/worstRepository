//homework10 Asynchronous JavaScript
//服务器
//功能 : 可同步求和的计算器
http = require('http');
fs   = require('fs');
url  = require('url');
mime = require('mime');
querystring = require('querystring');

http.createServer(function(req, res){
	console.log(req.url);
	var js_re = /\.js$/;
	var html_re = /\.html$/;
	pathName = url.parse(req.url).pathname;
	console.log(js_re.test(req.url) || html_re.test(req.url));
	if (js_re.test(req.url) || html_re.test(req.url)){
		console.log(pathName);
		var content = fs.readFileSync('./' + pathName);
		res.writeHead(200,{
			'Content-Type':mime.lookup(pathName)
		});
		res.end(content);
	}
	else
		response_number(req, res);
}).listen(3000, function(){
    console.log("listening!");
});

function getRandomNumber(limit){
    return Math.floor(Math.random() * limit);
}

function response_number(req, res){
	console.log("get number request!");
    var number = 1 + getRandomNumber(10);
    //var sleep_time = 1000;
    var sleep_time = 1000 + getRandomNumber(3000);
    setTimeout(function() {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.writeHead(200, {
            'Content-Type' : 'text/plain'
        });
        res.end("" + number);
    }, sleep_time);
}