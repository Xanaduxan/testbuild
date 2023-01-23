import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { State } from './types/state';

const initialState: State = {
  companies: [
    {
      id: 'ООО Бриллиант',
      company: 'ООО Бриллиант',
      address: 'г. Москва, ул. Ленина, д. 1',
    },
    {
      id: 'ООО Алмаз',
      company: 'ООО Алмаз',
      address: 'г. Москва, ул. Ленина, д. 1',
    },
    {
      id: 'ООО Сапфир',
      company: 'ООО Сапфир',
      address: 'г. Москва, ул. Ленина, д. 1',
    },
    {
      id: 'ООО Агат',
      company: 'ООО Агат',
      address: 'г. Москва, ул. Ленина, д. 1',
    },
    {
      id: 'ООО Стекляшка',
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

    removeSomeCompanies: (state, action) => {
      state.companies = state.companies.filter(
        (company) => !action.payload.includes(company.id)
      );
    },
  },
});
export const selectCompanies = (state: RootState) => state.companies.companies;

export default companySlice.reducer;
export const { addCompany, removeCompany, updateCompany, removeSomeCompanies } =
  companySlice.actions;
