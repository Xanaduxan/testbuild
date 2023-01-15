import { createSlice } from '@reduxjs/toolkit';
import { State } from './types/state';

const initialState: State = {
  companies: [
    {
      check: false,
      id: 1,
      company: 'ООО Бриллиант',
      count: 1,
      address: 'г. Москва, ул. Ленина, д. 1',
    },
    {
      check: false,
      id: 2,
      company: 'ООО Алмаз',
      count: 4,
      address: 'г. Москва, ул. Ленина, д. 1',
    },
    {
      check: false,
      id: 3,
      company: 'ООО Сапфир',
      count: 0,
      address: 'г. Москва, ул. Ленина, д. 1',
    },
    {
      check: false,
      id: 4,
      company: 'ООО Агат',
      count: 0,
      address: 'г. Москва, ул. Ленина, д. 1',
    },
    {
      check: false,
      id: 5,
      company: 'ООО Стекляшка',
      count: 0,
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
    addCountCompany: (state, action) => {
      state.companies = state.companies.map((company) =>
        company.id === action.payload.id
          ? {
              ...company,
              count: company.count + 1,
            }
          : company
      );
    },
    removeCountCompany: (state, action) => {
      state.companies = state.companies.map((company) =>
        company.id === action.payload.id
          ? {
              ...company,
              count: company.count - 1,
            }
          : company
      );
    },
    removeAllCountCompany: (state, action) => {
      state.companies = state.companies.map((company) =>
        action.payload.includes(company.id)
          ? {
              ...company,
              count: 0,
            }
          : company
      );
    },
    removeSomeCountCompany: (state, action) => {
      state.companies = state.companies.map((company) =>
        action.payload.includes(company.id)
          ? {
              ...company,
              count: company.count - 1,
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
export const {
  addCompany,
  removeCompany,
  updateCompany,
  addCountCompany,
  removeCountCompany,
  removeAllCountCompany,
  removeAllCompanies,
  removeSomeCountCompany,
} = companySlice.actions;
