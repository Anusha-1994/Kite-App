import api from './api';

class EmployeeService {
    getEmployeeDetails = async () => api.get(`/employees`);
    createUpdateEmployee = async (data: any) => api.put(`/employees`, data)
}

export default new EmployeeService()