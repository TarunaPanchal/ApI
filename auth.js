
const jwt = require('jsonwebtoken');



module.exports =(req, res, next)=>
{
    const JWTToken = req.header('Token');
    if (!JWTToken) 
        return res.send('Access Denied: No Token Provided!');
     else
    {
        const decoded = jwt.verify(JWTToken, "secret");
            req.user=decoded
            next();
    }
    
}