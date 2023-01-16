export interface Company {
  id: string;
  company: string;
  address: string;
}

export interface State {
  companies: Company[];
}
