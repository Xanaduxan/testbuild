import { createSlice } from '@reduxjs/toolkit';
import { State } from './types/state';

const initialState: State = {
  employees: [
    {
      check: false,
      id: 0,
      surname: 'Савельев',
      name: 'Петр',
      job: 'директор',
      companyId: 'OOO Агат',
    },
    {
      check: false,
      id: 1,
      surname: 'Петров',
      name: 'Иван',
      job: 'директор',
      companyId: 'ООО Сапфир',
    },
    {
      check: false,
      id: 2,
      surname: 'Петров',
      name: 'Иван',
      job: 'дворник',
      companyId: 'ООО Агат',
    },
    {
      check: false,
      id: 3,
      surname: 'Макаров',
      name: 'Иван',
      job: 'директор',
      companyId: 'ООО Алмаз',
    },
    {
      check: false,
      id: 4,
      surname: 'Иванов',
      name: 'Иван',
      job: 'директор',
      companyId: 'ООО Стекляшка',
    },
    {
      check: false,
      id: 5,
      surname: 'Ульянов',
      name: 'Иван',
      job: 'директор',
      companyId: '',
    },
  ],
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    initEmployees: (state, action) => {
      state.employees = state.employees.filter(
        (employee) => employee.companyId === action.payload
      );
    },
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },

    removeEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload
      );
    },
    removeAllCompanyEmployees: (state, action) => {
      state.employees = state.employees.filter(
        (employee) => employee.companyId !== action.payload
      );
    },
    removeSomeCompanyEmployees: (state, action) => {
      state.employees = state.employees.filter(
        (employee) => !action.payload.includes(employee.id)
      );
    },
    removeCompaniesEmployees: (state, action) => {
      state.employees = state.employees.filter(
        (employee) => !action.payload.includes(employee.companyId)
      );
    },

    updateEmployee: (state, action) => {
      state.employees = state.employees.map((employee) =>
        employee.id === action.payload.id
          ? {
              ...employee,
              surname: action.payload.surname,
              name: action.payload.name,
              job: action.payload.job,
            }
          : employee
      );
    },
  },
});

export default employeeSlice.reducer;
export const {
  initEmployees,
  addEmployee,
  removeCompaniesEmployees,
  removeEmployee,
  removeSomeCompanyEmployees,
  removeAllCompanyEmployees,
  updateEmployee,
} = employeeSlice.actions;
