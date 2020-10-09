const db            = require("../helpers/db");  
const User          = db.Users;
const UserRequest   = db.UserReq;
const constants     = require('../config/constants') 
const passwordHash  = require('password-hash');
const jwt           = require('jsonwebtoken');
const errorCode     = require('../config/errorCode')
const validation    = require('../helpers/validation')
const config        = require('../config/config')
const jwtDecode     = require('jwt-decode');

exports.login = (async (request, response) => {

    try{

        if(!request.body.email || request.body.email.trim().length === 0) {

            return response.status(400).send({
                code    :   errorCode.email_required,
                message :   constants.message.email_required
            });
            
        }

        if(!request.body.password || request.body.password.trim().length === 0){

            return response.status(400).send({
                code    :   errorCode.password_required,
                message :   constants.message.password_required
            });
        } 
        
        
        const user = await User.findOne({ email: request.body.email.toLowerCase().trim(), is_deleted : false });

        if(user) {

            let isPasswordSame = passwordHash.verify(request.body.password,user.password);

            if(isPasswordSame) {

                let userToken = getUserToken(user);
                user.token = userToken;
                await user.save();
                return response.status(200).send({result : userToken});           
            }else{

                return response.status(400).send({
                    code    :   errorCode.unauthorised_access,
                    message :   constants.message.unauthorised_access
                });
            }
        }else {
            return response.status(400).send({
                code    :   errorCode.unauthorised_access,
                message :   constants.message.unauthorised_access
            });
        }

    }catch(error){
        return response.status(500).send({
            code    :   errorCode.unknown_error,
            message :   constants.message.unknown_error
        });
    }
})

function getUserToken(user){
    let timeNow     = new Date();
    let expiryTime  = timeNow.setMinutes(timeNow.getMinutes() + 7200);
    let token = jwt.sign({ 
        uid           : user.id,
        name          : user.name,
        loginTime     : Date.now(),
        expiry_time   : expiryTime
    }, config.secret);
    
    return token;

}


