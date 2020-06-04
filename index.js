const express = require('express')
const history = require('connect-history-api-fallback');
const bodyParse = require('body-parser');
const serverConfig = require('./config/server');

const app = express()
// app.use(history())
app.use(bodyParse.json()); //数据JSON类型
app.use(bodyParse.urlencoded({
    extended: false
})); //解析post请求数据

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true)
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8")
    next()
});

app.get('/', (req, rsp) => rsp.send('hello dayou.'))
app.get('/bookinfo', require('./api/bookinfo'));
app.get('/allbook', require('./api/allbook'));

const port = serverConfig.port;
var server = app.listen(port, ()=> {
	console.log(`server running at port ${port}`);
	var host = server.address().address
	var port2 = server.address().port
	 
	  console.log("应用实例，访问地址为 http://%s:%s", host, port2)
})