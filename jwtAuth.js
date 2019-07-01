var exports = module.exports = {};
const jwt = require('jsonwebtoken');

//secret for jwt
const jwtTokenSecret = "ASSH7912EEKNQWQWOD0IH11RKOK544SWDI22U49@#y!(";



exports.verifyToken = function(req,res,next){
 	//check if token is present or not
	if(!req.headers.authorization){
 		return res.status(401).json({
                            "message":"token not present in header "
                        });
    }
     //passing token as "Bearer jwt_token"
    //getting token from header
    let token = req.headers.authorization.split(" ")[1];
	
	if(token === "null"){
	   return  res.status(401).send("Unauthorized request");
    	}

    jwt.verify(token, jwtTokenSecret, function(err, decoded) {
        if (err){
			return res.status(401).json({
                                       "message":"token is invalid"
                                   });
        }else{
            // if everything good, save to request for use in other routes
            
			req.userName = decoded.userName;
			req.userPassword=decoded.userPassword;
            next();
        }
    });
}


exports.decodeVendorToken = function(req,token1){
    //let token = req.headers.authorization.split(" ")[1];
    return jwt.decode(token1, config.jwtTokenSecret);
}

//creates jwt token based on payload defined in app.js at line 8 
exports.createToken = function(obj){
   
    var token = jwt.sign(obj, jwtTokenSecret, {
        expiresIn: 86400 // expires in 24 hours
    });

    return token;
}
