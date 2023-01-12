import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import companySlice from './features/company/companySlice';
import employeeSlice from './features/employee/employeeSlice';

const store = configureStore({
  reducer: {
    companies: companySlice,
    employees: employeeSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;
