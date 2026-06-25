const { createApiClient } = require("../support/apiClient");

class EmployeeApi {
  constructor(baseURL) {
    this.client = createApiClient(baseURL);
  }

  createEmployee(employee) {
    return this.client.post("/api/v1/employees", employee);
  }

  getAllEmployees() {
    return this.client.get("/api/v1/employees");
  }

  getEmployeeById(id) {
    return this.client.get(`/api/v1/employees/${id}`);
  }

  async createEmployeeAndFindByEmail(employee) {
    const createResponse = await this.createEmployee(employee);
    const allEmployeesResponse = await this.getAllEmployees();
    const createdEmployee = Array.isArray(allEmployeesResponse.data)
      ? allEmployeesResponse.data.find((item) => item.email === employee.email)
      : undefined;

    return { createResponse, allEmployeesResponse, createdEmployee };
  }
}

module.exports = { EmployeeApi };
