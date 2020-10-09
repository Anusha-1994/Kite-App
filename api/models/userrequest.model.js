const mongoose = require("mongoose");

let userRequestSchema = new mongoose.Schema({  
    _id         :   {
                        type : String
    } ,
    uid         :   {
                        type : String
                    },
    user_request:   {
                        type : Boolean, default:false
                    },
    created_on  :   {
                        type : Number
                    },
    expiry_time :   {
                        type : Number
                    },    
});

module.exports = mongoose.model('UserReq', userRequestSchema);