const db           = require("../helpers/db");  
const User         = db.Users;
const constants    = require('../config/constants') 
const validation   = require('../helpers/validation')
const errorCode    = require('../config/errorCode')
const passwordHash = require('password-hash');

exports.createUser = (async (req, res) =>{

    try{
  

        if(validation.isEmpty(req.body.email)){

            return res.status(400).send({
                code    :   errorCode.email_required,
                message :   constants.message.email_required
            });
        }

        if(validation.isEmpty(req.body.password)){

            return res.status(400).send({
                code    :   errorCode.password_required,
                message :   constants.message.password_required
            });
        }

        if(req.body.password.length < 6) {
            return res.status(400).send({
                code    :   errorCode.password_strength,
                message :   constants.message.password_strength
            });
        }
        if(req.body.password.length > 20) {
            return res.status(400).send({
                code    :   errorCode.password_length_high,
                message :   constants.message.password_length_high
            });
        }

        let user = await User.findOne({
            email: req.body.email.toLowerCase().trim()
        });
        if (user) {
            return res.status(400).send({
                code: errorCode.email_exist,
                message: constants.message.email_already_exist
            });
        } else {
            let regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

            if (regex.test(req.body.password)) {

                let userDetails = new User(req.body)
                Object.assign(userDetails, {
                    password: passwordHash.generate(req.body.password),
                    created_on: Date.now(),
                })

                await userDetails.save();
                return res.status(200).send({
                    message: constants.message.success
                });
            } else {
                return res.status(400).send({
                    code: errorCode.password_letter,
                    message: constants.message.password_letter
                });
            }

        }
        
        
    }catch(error) {
        return res.status(500).send({
            code    :   errorCode.unknown_error,
            message :   constants.message.unknown_error
        });
    }

})


exports.resetPassword = ( async (req,res) => {
    try {
        if(validation.isEmpty(req.body.email)) {
            return res.status(400).send({
                code    :   errorCode.email_required,
                message :   constants.message.email_required
            });
        }

        let user = await User.findOne({ email: req.body.email.toLowerCase().trim(), is_deleted : false });
        
        if(user) {
            let regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

            if (regex.test(req.body.password)) {
                
                await User.findOneAndUpdate({
                     email: req.body.email
                }, {password: passwordHash.generate(req.body.password)})

                return res.status(200).send({
                    message: constants.message.success
                });
            } else {
                return res.status(400).send({
                    code: errorCode.password_letter,
                    message: constants.message.password_letter
                });
            }

        }else{
            return res.status(400).send({
                code    : errorCode.email_not_registered,
                message : constants.message.email_not_registered
            });
        }    
     
    } catch(error) {
            return res.status(500).send({
                code    :   errorCode.unknown_error,
                message :   constants.message.unknown_error
            });
        }
    });





