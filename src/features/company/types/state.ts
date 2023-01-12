export interface Company {
  check: boolean;
  id: number;
  company: string;
  count: number;
  address: string;
}

export interface State {
  companies: Company[];
}

export type CompanyId = Company['id'];

export type Action =
  | { type: 'companies/loadCompanies'; payload: Company[] }
  | { type: 'companies/removeCompany'; payload: CompanyId };
