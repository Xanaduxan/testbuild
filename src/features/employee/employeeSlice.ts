import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { State } from './types/state';

const initialState: State = [
  {
    id: 'СавельевПетр',
    surname: 'Савельев',
    name: 'Петр',
    job: 'директор',
    companyId: 'OOO Агат',
  },
  {
    id: 'СидоровИван',
    surname: 'Сидоров',
    name: 'Иван',
    job: 'директор',
    companyId: 'ООО Сапфир',
  },
  {
    id: 'ПетровИван',
    surname: 'Петров',
    name: 'Иван',
    job: 'дворник',
    companyId: 'ООО Агат',
  },
  {
    id: 'МакаровИван',
    surname: 'Макаров',
    name: 'Иван',
    job: 'директор',
    companyId: 'ООО Алмаз',
  },
  {
    id: 'ИвановИван',
    surname: 'Иванов',
    name: 'Иван',
    job: 'директор',
    companyId: 'ООО Стекляшка',
  },
  {
    id: 'УльяновИван',
    surname: 'Ульянов',
    name: 'Иван',
    job: 'директор',
    companyId: 'ООО Бриллиант',
  },
  {
    id: 'БаранкинСтепан',
    surname: 'Баранкин',
    name: 'Степан',
    job: 'директор',
    companyId: 'ООО Алмаз',
  },
];

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    initEmployees: (state, action) => {
      state = state.filter((employee) => employee.companyId === action.payload);
    },
    addEmployee: (employees, action) => {
      employees.push(action.payload);
    },

    removeEmployee: (state, action) => {
      return state.filter((employee) => employee.id !== action.payload);
    },
    removeAllCompanyEmployees: (state, action) => {
      return state.filter((employee) => employee.companyId !== action.payload);
    },
    removeSomeCompanyEmployees: (state, action) => {
      return state.filter((employee) => !action.payload.includes(employee.id));
    },
    removeEmployeesByCompanyIds: (state, action) => {
      return state.filter(
        (employee) => !action.payload.includes(employee.companyId)
      );
    },

    updateEmployee: (state, action) => {
      return state.map((employee) =>
        employee.id === action.payload.id
          ? {
              ...employee,
              ...action.payload,
            }
          : employee
      );
    },
  },
});

export const selectEmployees = (state: RootState) => state.employees;
export default employeeSlice.reducer;
export const {
  initEmployees,
  addEmployee,
  removeEmployeesByCompanyIds,
  removeEmployee,
  removeSomeCompanyEmployees,
  removeAllCompanyEmployees,
  updateEmployee,
} = employeeSlice.actions;
