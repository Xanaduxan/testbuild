import { createSlice } from '@reduxjs/toolkit';
import { State } from './types/state';

const initialState: State = {
  employees: [
    {
      check: false,
      id: 1,
      surname: 'Петров',
      name: 'Иван',
      job: 'директор',
      companyId: 1,
    },
    {
      check: false,
      id: 2,
      surname: 'Петров',
      name: 'Иван',
      job: 'директор',
      companyId: 2,
    },
  ],
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    initEmployees: (state, action) => {
      state.employees.filter(
        (employee) => employee.companyId === action.payload
      );
    },
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
    selectEmployee: (state, action) => {
      state.employees = state.employees.map((employee) =>
        employee.id === action.payload
          ? { ...employee, check: !employee.check }
          : employee
      );
    },
  },
});

export default employeeSlice.reducer;
export const { initEmployees, addEmployee, selectEmployee } =
  employeeSlice.actions;
