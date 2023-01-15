import { Dispatch, SetStateAction, useState } from 'react';
import { useAppDispatch } from '../store';
import EmployeeRow from './EmployeeRow';
import { Employee as IEmployee } from '../features/employee/types/state';
import { removeSomeCompanyEmployees } from '../features/employee/employeeSlice';

const Employee = ({
  firmIds,
  setFirmIds,
  employees,
}: {
  firmIds: Array<string>;
  setFirmIds: Dispatch<SetStateAction<Array<string>>>;
  employees: IEmployee[];
}) => {
  const sortEmployees = employees.filter((employee: IEmployee) =>
    firmIds.includes(employee.companyId)
  );

  const employeesIds = sortEmployees.map((emp) => emp.id);
  const [restartChoose, setRestartChoose] = useState(false);
  const [notAllChoose, setNotAllChoose] = useState(true);
  const [choose, setChoose] = useState(false);
  const [worker, setWorker] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const selectAllEmployees = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChoose((prev) => !prev);
    setNotAllChoose((prev) => !prev);
  };
  const deleteAllEmployees = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(removeSomeCompanyEmployees(employeesIds));
    setRestartChoose((prev) => !prev);
  };
  const deleteSomeEmployees = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(worker);
    dispatch(removeSomeCompanyEmployees(worker));
    setWorker(() => []);
    setRestartChoose((prev) => !prev);
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
                {choose && (
                  <button onClick={deleteAllEmployees}>Удалить всех</button>
                )}
                {notAllChoose && (
                  <button onClick={deleteSomeEmployees}>
                    Удалить выбранное
                  </button>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortEmployees.map((employee: IEmployee) => (
              <EmployeeRow
                employee={employee}
                choose={choose}
                setChoose={setChoose}
                worker={worker}
                setWorker={setWorker}
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

export default Employee;
