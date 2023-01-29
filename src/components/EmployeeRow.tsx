import React, { Dispatch, SetStateAction, useState } from 'react';

import {
  removeEmployee,
  updateEmployee,
} from '../features/employee/employeeSlice';
import { Employee } from '../features/employee/types/state';
import { useAppDispatch } from '../store';

type Props = {
  employee: Employee;
  workers: string[];
  setWorkers: Dispatch<SetStateAction<Array<string>>>;
};
const EmployeeRow = ({ employee, workers, setWorkers }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [employeeSurname, setEmployeeSurname] = useState(employee.surname);
  const [employeeName, setEmployeeName] = useState(employee.name);
  const [employeeJob, setEmployeeJob] = useState(employee.job);

  const dispatch = useAppDispatch();
  const selectOneEmployee = () => {
    setWorkers((prev) =>
      prev.includes(employee.id)
        ? prev.filter((ind) => ind !== employee.id)
        : [...prev, employee.id]
    );
  };

  const onSave = () => {
    setIsEditing((prev) => !prev);
    if (
      employee.name !== employeeName ||
      employee.surname !== employeeSurname ||
      employee.job !== employeeJob
    ) {
      dispatch(
        updateEmployee({
          id: employee.id,
          name: employeeName,
          surname: employeeSurname,
          job: employeeJob,
        })
      );
    }

    setEmployeeName(employee.name);
    setEmployeeSurname(employee.surname);
    setEmployeeJob(employee.job);
  };

  const deleteEmployee = () => {
    dispatch(removeEmployee(employee.id));
    workers = workers.filter((worker) => worker === employee.id);
  };

  return (
    <tr
      key={employee.id}
      className={workers.includes(employee.id) ? 'selected' : ''}
    >
      <td key={`${employee.id}input`}>
        <input
          type="checkbox"
          checked={workers.includes(employee.id)}
          onChange={selectOneEmployee}
        />
      </td>
      <td>
        {isEditing ? (
          <input
            value={employeeSurname}
            onChange={(e): void => {
              setEmployeeSurname(e.target.value);
            }}
            required
          />
        ) : (
          <>{employee.surname}</>
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            value={employeeName}
            onChange={(e): void => {
              setEmployeeName(e.target.value);
            }}
            required
          />
        ) : (
          <>{employee.name}</>
        )}
      </td>
      <td>
        {isEditing ? (
          <input
            value={employeeJob}
            onChange={(e): void => {
              setEmployeeJob(e.target.value);
            }}
            required
          />
        ) : (
          <>{employee.job}</>
        )}
      </td>
      <td>
        {workers.includes(employee.id) && (
          <>
            <button type="button" onClick={deleteEmployee}>
              Удалить
            </button>
            <button
              type="button"
              onClick={() => (!isEditing ? setIsEditing(true) : onSave())}
            >
              {isEditing ? 'Сохранить' : 'Редактировать'}
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default EmployeeRow;
