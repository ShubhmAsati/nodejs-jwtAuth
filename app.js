var express = require('express')
var jwtAuth = require('./jwtAuth')

const port = 8080
var app = express();
app.use(express.json());
app.post('/signup',(req,res,next)=>{
	let payLoad = {  // payload for jwt token , we will get same userName and password after decoding token .
		userName: req.body.userName,
		userPassword : req.body.userPassword
	};
	token = jwtAuth.createToken(payLoad);
	res.status(200).json({"token":token})
});


app.get('/login',jwtAuth.verifyToken,(req,res,next)=>{
	res.status(200).json({"msg":"login Success"});
});
app.listen(port , ()=>{
	console.log("--------------------------------- server started at port "+port+" -------------------------------");
});
