const mongoose  = require('mongoose');
const constants = require('../config/constants')
mongoose.connect(constants.connection_string, { 
    useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true,useFindAndModify: false
});

module.exports = {
    
    Users               :  require('../models/user.model'),
    UserReq             :  require('../models/userrequest.model'),
    Employee            :  require('../models/employee.model') 
};