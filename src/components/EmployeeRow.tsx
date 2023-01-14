import React from 'react';
import { removeCountCompany } from '../features/company/companySlice';
import { removeEmployee } from '../features/employee/employeeSlice';
import { Employee } from '../features/employee/types/state';
import { useAppDispatch } from '../store';

const EmployeeRow = ({ employee }: { employee: Employee }) => {
  const dispatch = useAppDispatch();
  const deleteEmployee = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(removeEmployee(employee.id));
    dispatch(removeCountCompany({ id: employee.companyId }));
  };
  return (
    <tr key={employee.id}>
      <td>
        <input type="checkbox" />
      </td>
      <td>{employee.surname}</td>
      <td>{employee.name}</td>
      <td>{employee.job}</td>
      <td>
        {' '}
        <button type="button" onClick={deleteEmployee}>
          Удалить
        </button>
      </td>
    </tr>
  );
};

export default EmployeeRow;
