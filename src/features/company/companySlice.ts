import { createSlice } from '@reduxjs/toolkit';
import { State } from './types/state';

const initialState: State = {
  companies: [
    {
      check: false,
      id: 1,
      company: 'ООО Бриллиант',
      address: 'г. Москва, ул. Ленина, д. 1',
    },
    {
      check: false,
      id: 2,
      company: 'ООО Алмаз',
      address: 'г. Москва, ул. Ленина, д. 1',
    },
    {
      check: false,
      id: 3,
      company: 'ООО Сапфир',
      address: 'г. Москва, ул. Ленина, д. 1',
    },
    {
      check: false,
      id: 4,
      company: 'ООО Агат',
      address: 'г. Москва, ул. Ленина, д. 1',
    },
    {
      check: false,
      id: 5,
      company: 'ООО Стекляшка',
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

    removeCompany: (state, action) => {
      state.companies = state.companies.filter(
        (company) => company.id !== action.payload
      );
    },
    updateCompany: (state, action) => {
      state.companies = state.companies.map((company) =>
        company.id === action.payload.id
          ? {
              ...company,
              company: action.payload.company,
              address: action.payload.address,
            }
          : company
      );
    },

    removeAllCompanies: (state, action) => {
      state.companies = state.companies.filter(
        (company) => !action.payload.includes(company.id)
      );
    },
  },
});

export default companySlice.reducer;
export const { addCompany, removeCompany, updateCompany, removeAllCompanies } =
  companySlice.actions;
