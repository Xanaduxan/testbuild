export interface Company {
  check: boolean;
  id: string;
  company: string;

  address: string;
}

export interface State {
  companies: Company[];
}

export type CompanyId = Company['id'];

export type Action =
  | { type: 'companies/loadCompanies'; payload: Company[] }
  | { type: 'companies/removeCompany'; payload: CompanyId };
