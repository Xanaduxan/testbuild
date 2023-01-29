import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { State } from './types/state';

const initialState: State = [
  {
    id: 'ООО Бриллиант',
    name: 'ООО Бриллиант',
    address: 'г. Москва, ул. Ленина, д. 1',
  },
  {
    id: 'ООО Алмаз',
    name: 'ООО Алмаз',
    address: 'г. Москва, ул. Ленина, д. 1',
  },
  {
    id: 'ООО Сапфир',
    name: 'ООО Сапфир',
    address: 'г. Москва, ул. Ленина, д. 1',
  },
  {
    id: 'ООО Агат',
    name: 'ООО Агат',
    address: 'г. Москва, ул. Ленина, д. 1',
  },
  {
    id: 'ООО Стекляшка',
    name: 'ООО Стекляшка',
    address: 'г. Москва, ул. Ленина, д. 1',
  },
];

const companySlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {
    addCompany: (state, action) => {
      state.push(action.payload);
    },

    removeCompany: (companies, action) =>
      companies.filter((company) => company.id !== action.payload),
    updateCompany: (state, action) =>
      state.map((company) =>
        company.id === action.payload.id
          ? {
              ...action.payload,
            }
          : company
      ),
    removeCompanies: (state, action) =>
      state.filter((company) => !action.payload.includes(company.id)),
  },
});
export const selectCompanies = (state: RootState) => state.companies;

export default companySlice.reducer;
export const { addCompany, removeCompany, updateCompany, removeCompanies } =
  companySlice.actions;
