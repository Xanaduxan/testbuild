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
  const [restartChoose, setRestartChoose] = useState(false);
  const [notAllChoose, setNotAllChoose] = useState(true);
  const [choose, setChoose] = useState(false);
  const [workers, setWorkers] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const selectAllEmployees = () => {
    setChoose((prev) => !prev);
    setNotAllChoose((prev) => !prev);
  };
  const deleteAllEmployees = () => {
    dispatch(removeSomeCompanyEmployees(employeesIds));
    setRestartChoose((prev) => !prev);
    setNotAllChoose(() => true);
  };
  const deleteSomeEmployees = () => {
    dispatch(removeSomeCompanyEmployees(workers));
    setWorkers(() => []);
    setRestartChoose((prev) => !prev);
    setNotAllChoose(() => true);
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
                  checked={choose}
                  onChange={selectAllEmployees}
                />
              </th>
              <th>Фамилия</th>
              <th>Имя</th>
              <th>Должность</th>
              <th>
                {choose && (
                  <button onClick={deleteAllEmployees}>Удалить всех</button>
                )}
                {notAllChoose && (
                  <button onClick={deleteSomeEmployees}>
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
                choose={choose}
                setChoose={setChoose}
                setWorkers={setWorkers}
                restartChoose={restartChoose}
                setRestartChoose={setRestartChoose}
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
