import { createSlice } from '@reduxjs/toolkit';
import { State } from './types/state';

const initialState: State = {
  companies: [
    {
      check: false,
      id: 1,
      company: 'ООО Бриллиант',
      count: 10,
      address: 'г. Москва, ул. Ленина, д. 1',
    },
    {
      check: false,
      id: 2,
      company: 'ООО Алмаз',
      count: 10,
      address: 'г. Москва, ул. Ленина, д. 1',
    },
  ],
};

const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    addCompany: (state, action) => {
      state.companies.push(action.payload);
    },
    selectCompany: (state, action) => {
      state.companies = state.companies.map((company) =>
        company.id === action.payload
          ? { ...company, check: !company.check }
          : company
      );
    },
  },
});

export default companySlice.reducer;
export const { addCompany, selectCompany } = companySlice.actions;