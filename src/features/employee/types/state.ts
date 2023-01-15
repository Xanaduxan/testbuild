export interface Employee {
  check: boolean;
  id: string;
  surname: string;
  name: string;
  job: string;
  companyId: string;
}

export interface State {
  employees: Employee[];
}

export type EmployeeId = Employee['id'];

export type Action =
  | { type: 'employees/initEmployees'; payload: Employee[] }
  | { type: 'employees/loadEmployees'; payload: Employee[] }
  | { type: 'employees/removeEmployee'; payload: EmployeeId }
  | { type: 'employees/selectEmployee'; payload: EmployeeId }
  | { type: 'employees/selectAllEmployees' }
  | { type: 'employees/updateEmployee'; payload: Employee };
