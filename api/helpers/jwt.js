const expressJwt = require('express-jwt');
const config     = require('../config/config');
const db         = require('../helpers/db');
const configs    = require('../config/config')
const User       = db.Users;
module.exports = jwt;

function jwt() {
    const secret = configs.secret;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            '/login', '/resetpassword', '/signup'
        ]
    });
}

async function isRevoked(req, payload, done) {
    let user = await User.findById(payload.uid)
    if(!user || user.is_deleted || user.token !== req.headers.authorization.split(' ')[1]){
        return done(null, true); 
    }
   return done(null,false);
};