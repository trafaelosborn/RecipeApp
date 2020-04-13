const config = require('config');
const jwt = require('jsonwebtoken');

// middle ware function to create private route

// get token from front end 
function auth(req, res, next) {
    const token = req.header('x-auth-token');

    // Check for token
    if (!token) 
        return res.status(401).json({msg: 'No token, authorization denied.'});

    try{
        // verify token
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        // Add user from payload
        req.user = decoded;
        next();
    } catch(e) {
		console.log('middleware: auth failed')
        res.status(400).json({ msg: 'Token is not valid'});
    }   
}

module.exports = auth;