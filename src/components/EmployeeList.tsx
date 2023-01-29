import { useState } from 'react';
import { useAppDispatch } from '../store';
import EmployeeRow from './EmployeeRow';
import { Employee as IEmployee } from '../features/employee/types/state';
import { removeSomeCompanyEmployees } from '../features/employee/employeeSlice';

type Props = {
  firmIds: Array<string>;
  employees: IEmployee[];
};
const EmployeeList = ({ firmIds, employees }: Props) => {
  const filteredEmployees = employees.filter((employee: IEmployee) =>
    firmIds.includes(employee.companyId)
  );
  const employeesIds = filteredEmployees.map((emp) => emp.id);
  const [workers, setWorkers] = useState<string[]>([]);
  const areAllEmployeesSelected =
    workers.length > 0 && workers.length === employeesIds.length;
  const showDeleteAllButton =
    workers.length > 0 && workers.length === employeesIds.length;
  const dispatch = useAppDispatch();
  const selectAllEmployees = () => {
    areAllEmployeesSelected ? setWorkers([]) : setWorkers(employeesIds);
  };

  const deleteEmployees = () => {
    dispatch(removeSomeCompanyEmployees(workers));
    setWorkers(() => []);
  };

  return (
    <>
      {filteredEmployees.length ? (
        <table>
          <thead>
            <tr>
              <th>
                Выделить все
                <input
                  type="checkbox"
                  checked={areAllEmployeesSelected}
                  onChange={selectAllEmployees}
                />
              </th>
              <th>Фамилия</th>
              <th>Имя</th>
              <th>Должность</th>
              <th>
                {showDeleteAllButton && (
                  <button onClick={deleteEmployees}>Удалить всех</button>
                )}
                {!areAllEmployeesSelected && (
                  <button onClick={deleteEmployees}>
                    Удалить выбранных сотрудников
                  </button>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee: IEmployee) => (
              <EmployeeRow
                employee={employee}
                workers={workers}
                setWorkers={setWorkers}
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

export default EmployeeList;
