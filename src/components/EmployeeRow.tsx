import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
// import { removeCountCompany } from '../features/company/companySlice';
import {
  removeEmployee,
  updateEmployee,
} from '../features/employee/employeeSlice';
import { Employee } from '../features/employee/types/state';
import { useAppDispatch } from '../store';

type Props = {
  employee: Employee;
  choose: boolean;
  setChoose: Dispatch<SetStateAction<boolean>>;
  setWorkers: Dispatch<SetStateAction<Array<string>>>;
  restartChoose: boolean;
  setRestartChoose: (callback: (chosen: boolean) => boolean) => void;
};
const EmployeeRow = ({
  employee,
  choose,
  setChoose,
  setWorkers,
  restartChoose,
  setRestartChoose,
}: Props) => {
  const [chosenEmployee, setChosenEmployee] = useState(false);
  const [showEmployee, setShowEmployee] = useState(false);
  const [showEditEmployee, setShowEditEmployee] = useState(false);
  const [employeeSurname, setEmployeeSurname] = useState(employee.surname);
  const [employeeName, setEmployeeName] = useState(employee.name);
  const [employeeJob, setEmployeeJob] = useState(employee.job);
  useEffect(() => {
    if (restartChoose) {
      setChosenEmployee(false);
      setChoose(false);
      setShowEmployee(false);
    }
  }, [restartChoose]);
  const dispatch = useAppDispatch();
  const selectOneEmployee = () => {
    setChosenEmployee((prevChose) => !prevChose);
    setShowEmployee((prev) => !prev);
    setWorkers((prev) =>
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
  const editEmployee = () => {
    setShowEditEmployee((prev) => !prev);
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
