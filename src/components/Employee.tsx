import { useSelector } from 'react-redux';
import { Dispatch, SetStateAction } from 'react';
import { RootState } from '../store';
import EmployeeRow from './EmployeeRow';
import { Employee as IEmployee } from '../features/employee/types/state';

const Employee = ({
  firmId,
  setFirmId,
}: {
  firmId: Array<number>;
  setFirmId: Dispatch<SetStateAction<Array<number>>>;
}) => {
  const { employees } = useSelector((state: RootState) => state.employees);
  const sortEmployyes = employees.filter((employee: IEmployee) =>
    firmId.includes(employee.companyId)
  );

  return (
    <table>
      <thead>
        <tr>
          <th>
            Чекбокс
            <input type="checkbox" />
          </th>
          <th>Фамилия</th>
          <th>Имя</th>
          <th>Должность</th>
        </tr>
      </thead>
      <tbody>
        {sortEmployyes.map((employee: IEmployee) => (
          <EmployeeRow employee={employee} />
        ))}
      </tbody>
    </table>
  );
};

export default Employee;
