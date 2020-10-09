const mongoose = require("mongoose");

let EmployeeSchema = new mongoose.Schema({
    Name: {
        type: String
    },
    EmployeeId: {
        type: String
    },
    Grade: {
        type: String
    },
    ContactNumber: {
        type: Number
    },
    Designation: {
        type: String
    },
});

module.exports = mongoose.model('Employee', EmployeeSchema);