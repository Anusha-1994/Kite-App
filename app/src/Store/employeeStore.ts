import { observable, decorate, action } from 'mobx';
import Constant from '../Global/Constant';
import employeeService from '../Services/employeeService';

class EmployeeStore {
    employees: Array<any> = [];

    async getEmployeeDetails(callback: any) {
        try {
            const response = await employeeService.getEmployeeDetails();
            this.employees = response.data.result;
            callback(null);
        } catch (err) {
            let errorMsg = Constant.defaultErrorMessage;
            if (err && err.response && err.response.data && err.response.data.message) {
                errorMsg = err.response.data.message;
            }
            callback(new Error(errorMsg));
        }
    }

    async createUpdateEmployee(details: any, callback: any) {
        try {
            const response = await employeeService.createUpdateEmployee(details);
            callback(null);
        } catch (err) {
            let errorMsg = Constant.defaultErrorMessage;
            if (err && err.response && err.response.data && err.response.data.message) {
                errorMsg = err.response.data.message;
            }
            callback(new Error(errorMsg));

        }
    }

}

decorate(EmployeeStore, {
    employees           : observable,
    getEmployeeDetails  : action,
    createUpdateEmployee: action
});

export default new EmployeeStore();
