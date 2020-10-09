const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    
    email       :   {
                        type : String, unique: true, required: true, index: true
                    },
    password    :   {
                        type : String
                    },
    created_on  :   {
                        type : Number
                    },
    is_deleted  :   {
                        type : Boolean, default:false
    },
    token       :   {
                        type : String
    }
            
});

module.exports = mongoose.model('Users', userSchema);