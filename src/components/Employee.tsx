import { useSelector } from 'react-redux';
import { Dispatch, SetStateAction, useState } from 'react';
import { RootState, useAppDispatch } from '../store';
import EmployeeRow from './EmployeeRow';
import { Employee as IEmployee } from '../features/employee/types/state';
import {
  removeCompaniesEmployees,
  removeSomeCompanyEmployees,
} from '../features/employee/employeeSlice';
import {
  removeAllCountCompany,
  removeCountCompany,
  removeSomeCountCompany,
} from '../features/company/companySlice';

const Employee = ({
  firmIds,
  setFirmIds,
  employees,
}: {
  firmIds: Array<number>;
  setFirmIds: Dispatch<SetStateAction<Array<number>>>;
  employees: IEmployee[];
}) => {
  // const { employees } = useSelector((state: RootState) => state.employees);
  const sortEmployees = employees.filter((employee: IEmployee) =>
    firmIds.includes(employee.companyId)
  );
  const employeesIds = sortEmployees.map((emp) => emp.id);

  const [choose, setChoose] = useState(false);
  const [worker, setWorker] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  const selectAllEmployees = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChoose((prev) => !prev);
  };
  const deleteAllEmployees = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(removeCompaniesEmployees(employeesIds));
    dispatch(removeAllCountCompany(firmIds));
  };
  const deleteSomeEmployees = (e: React.MouseEvent<HTMLButtonElement>) => {
    const companyIdToRemoveCount = employees
      .filter((el) => worker.includes(el.id))
      .map((emp) => emp.companyId);
    // console.log(companyIdToRemoveCount);
    // for (let i = 0; i < companyIdToRemoveCount.length; i++) {
    //   dispatch(removeCountCompany(companyIdToRemoveCount[i]));
    // }
    dispatch(removeSomeCompanyEmployees(worker));
    dispatch(removeSomeCountCompany(companyIdToRemoveCount));
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
