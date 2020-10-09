const db            = require("../helpers/db");
const Employee      = db.Employee;
const errorCode     = require('../config/errorCode')
const constants     = require('../config/constants')
const validation    = require('../helpers/validation')



exports.getEmployeeDetails = (async (request, response) => {
 try {
        let employeeDetails = await Employee.find();
        return response.status(200).send({
            result: employeeDetails
        });
    } catch (error) {
        return response.status(500).send({
            code: errorCode.unknown_error,
            message: constants.message.unknown_error
        });
    }

})

exports.createEmployeeDetails = (async (request, response) => {
   

    try {
        if (validation.isEmpty(request.body.Name)) {
            return response.status(400).send({
                 code: errorCode.name_required,
                 message: constants.message.name_required
             });
        }
        if (request.body._id && request.body._id.length > 0) {
            await Employee.findOneAndUpdate({
                _id: request.body._id
            }, request.body)
        }
        else {
            let Employeedata = new Employee({
                Name         : request.body.Name,
                EmployeeId   : request.body.EmployeeId,
                Grade        : request.body.Grade,
                ContactNumber: request.body.ContactNumber,
                Designation  : request.body.Designation,
            })
            await Employeedata.save();
           
        }
        return response.status(200).send({
            message: constants.message.success
        });
      

    }
    catch(error){
        return response.status(500).send({
            code: errorCode.unknown_error,
            message: constants.message.unknown_error
        });
    }


})
