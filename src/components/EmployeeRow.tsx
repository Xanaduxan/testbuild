import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
// import { removeCountCompany } from '../features/company/companySlice';
import {
  removeEmployee,
  updateEmployee,
} from '../features/employee/employeeSlice';
import { Employee } from '../features/employee/types/state';
import { useAppDispatch } from '../store';

const EmployeeRow = ({
  employee,
  choose,
  setChoose,
  worker,
  setWorker,
  restartChoose,
  setRestartChoose,
}: {
  employee: Employee;
  choose: boolean;
  setChoose: (callback: (chosen: boolean) => boolean) => void;
  worker: Array<number>;
  setWorker: Dispatch<SetStateAction<Array<number>>>;
  restartChoose: boolean;
  setRestartChoose: (callback: (chosen: boolean) => boolean) => void;
}) => {
  const [chosenEmployee, setChosenEmployee] = useState(false);
  const [showEmployee, setShowEmployee] = useState(false);
  const [showEditEmployee, setShowEditEmployee] = useState(false);
  const [employeeSurname, setEmployeeSurname] = useState(employee.surname);
  const [employeeName, setEmployeeName] = useState(employee.name);
  const [employeeJob, setEmployeeJob] = useState(employee.job);
  useEffect(() => {
    if (restartChoose) {
      setChosenEmployee(() => false);
      setChoose(() => false);
      setShowEmployee(() => false);
    }
  }, [restartChoose]);
  const dispatch = useAppDispatch();
  const selectOneEmployee = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChosenEmployee((prevChose) => !prevChose);
    setShowEmployee((prev) => !prev);
    setWorker((prev) =>
      prev.includes(employee.id)
        ? prev.filter((ind) => ind !== employee.id)
        : [...prev, employee.id]
    );
    setRestartChoose(() => false);
  };
  const handleChangeSurname = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setEmployeeSurname(e.target.value);
  };
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmployeeName(e.target.value);
  };
  const handleChangeJob = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setEmployeeJob(e.target.value);
  };
  const editEmployee = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowEditEmployee((prev) => !prev);
    if (employeeSurname) {
      dispatch(
        updateEmployee({
          id: employee.id,
          name: employee.name,
          surname: employeeSurname,
          job: employee.job,
        })
      );
    }
    if (employeeName) {
      dispatch(
        updateEmployee({
          id: employee.id,
          name: employeeName,
          surname: employee.surname,
          job: employee.job,
        })
      );
    }
    if (employeeJob) {
      dispatch(
        updateEmployee({
          id: employee.id,
          name: employee.name,
          surname: employee.surname,
          job: employeeJob,
        })
      );
    } else {
      dispatch(
        updateEmployee({
          id: employee.id,
          name: employee.name,
          surname: employee.surname,
          job: employee.job,
        })
      );
    }
    setEmployeeName(employee.name);
    setEmployeeSurname(employee.surname);
    setEmployeeJob(employee.job);
  };

  const deleteEmployee = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(removeEmployee(employee.id));
    setChosenEmployee((prev) => !prev);
    setShowEmployee((prev) => !prev);
    setRestartChoose(() => false);
  };

  return (
    <tr
      key={employee.id}
      className={chosenEmployee || choose ? 'selected' : ''}
    >
      <td key={`${employee.id}input`}>
        <input
          type="checkbox"
          checked={chosenEmployee || choose}
          onChange={selectOneEmployee}
        />
      </td>
      <td>
        {showEditEmployee ? (
          <input
            value={employeeSurname}
            onChange={handleChangeSurname}
            required
          />
        ) : (
          <>{employee.surname}</>
        )}
      </td>
      <td>
        {showEditEmployee ? (
          <input value={employeeName} onChange={handleChangeName} required />
        ) : (
          <>{employee.name}</>
        )}
      </td>
      <td>
        {' '}
        {showEditEmployee ? (
          <input value={employeeJob} onChange={handleChangeJob} required />
        ) : (
          <>{employee.job}</>
        )}
      </td>
      <td>
        {' '}
        {showEmployee && (
          <>
            <button type="button" onClick={deleteEmployee}>
              Удалить
            </button>
            <button type="button" onClick={editEmployee}>
              {showEditEmployee ? 'Сохранить' : 'Редактировать'}
            </button>
          </>
        )}
      </td>
    </tr>
  );
};

export default EmployeeRow;
