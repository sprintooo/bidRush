const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const config = require('./config');
dotenv.config();

const SECRET_KEY = config.secretKey;

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    console.log('Auth Header:', authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    
    if (token == null) {
        return res.sendStatus(401);
    }

    console.log('Token:', token);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
}

exports.authenticateToken = authenticateToken;
