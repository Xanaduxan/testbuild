export interface Employee {
  check: boolean;
  id: number;
  surname: string;
  name: string;
  job: string;
  companyId: number;
}

export interface State {
  employees: Employee[];
}

export type EmployeeId = Employee['id'];

export type Action =
  | { type: 'employees/loadEmployees'; payload: Employee[] }
  | { type: 'employees/removeEmployee'; payload: EmployeeId };
