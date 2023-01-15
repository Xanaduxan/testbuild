import { Dispatch, SetStateAction, useState } from 'react';
import { useAppDispatch } from '../store';
import EmployeeRow from './EmployeeRow';
import { Employee as IEmployee } from '../features/employee/types/state';
import {
  removeCompaniesEmployees,
  removeSomeCompanyEmployees,
} from '../features/employee/employeeSlice';

const Employee = ({
  firmIds,
  setFirmIds,
  employees,
}: {
  firmIds: Array<number>;
  setFirmIds: Dispatch<SetStateAction<Array<number>>>;
  employees: IEmployee[];
}) => {
  const sortEmployees = employees.filter((employee: IEmployee) =>
    firmIds.includes(employee.companyId)
  );
  const employeesIds = sortEmployees.map((emp) => emp.id);
  const [restartChoose, setRestartChoose] = useState(false);

  const [choose, setChoose] = useState(false);
  const [worker, setWorker] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  const selectAllEmployees = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChoose((prev) => !prev);
  };
  const deleteAllEmployees = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(removeSomeCompanyEmployees(employeesIds));
    setRestartChoose((prev) => !prev);
  };
  const deleteSomeEmployees = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(removeSomeCompanyEmployees(worker));
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
                <button onClick={deleteSomeEmployees}>Удалить</button>
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
