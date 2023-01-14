import { useSelector } from 'react-redux';
import { Dispatch, SetStateAction, useState } from 'react';
import { RootState } from '../store';
import EmployeeRow from './EmployeeRow';
import { Employee as IEmployee } from '../features/employee/types/state';

const Employee = ({
  firmIds,
  setFirmIds,
}: {
  firmIds: Array<number>;
  setFirmIds: Dispatch<SetStateAction<Array<number>>>;
}) => {
  const { employees } = useSelector((state: RootState) => state.employees);
  const sortEmployees = employees.filter((employee: IEmployee) =>
    firmIds.includes(employee.companyId)
  );

  const [choose, setChoose] = useState(false);
  const selectAllEmployees = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChoose((prev) => !prev);
  };

  return (
    <>
      {sortEmployees.length ? (
        <table>
          <thead>
            <tr>
              <th>
                Выделить все
                <input
                  type="checkbox"
                  checked={choose}
                  onChange={selectAllEmployees}
                />
              </th>
              <th>Фамилия</th>
              <th>Имя</th>
              <th>Должность</th>
              <th>
                <button>Удалить</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortEmployees.map((employee: IEmployee) => (
              <EmployeeRow
                employee={employee}
                choose={choose}
                setChoose={setChoose}
              />
            ))}
          </tbody>
        </table>
      ) : (
        ''
      )}
    </>
  );
};

export default Employee;
