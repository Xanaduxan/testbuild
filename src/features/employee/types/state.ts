export interface Employee {
  id: string;
  surname: string;
  name: string;
  job: string;
  companyId: string;
}

export interface State {
  employees: Employee[];
}
