import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  addEmployee,
  selectEmployees,
} from '../features/employee/employeeSlice';
import { useAppDispatch } from '../store';

type Props = {
  companyId: string;
  setshowAddEmployeeForm: (
    callback: (showAddEmployeeForm: boolean) => boolean
  ) => void;
};

const EmployeeForm = ({ companyId, setshowAddEmployeeForm }: Props) => {
  const [surname, setSurname] = useState('');
  const [firstName, setFirstName] = useState('');
  const [job, setJob] = useState('');
  const dispatch = useAppDispatch();
  const employees = useSelector(selectEmployees);
  const handleChangeSurname = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSurname(e.target.value);
  };

  const handleAddEmployee = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newId = surname + firstName + employees.length;
    dispatch(
      addEmployee({
        id: newId,
        surname,
        name: firstName,
        job,
        companyId,
      })
    );

    setshowAddEmployeeForm((prev) => !prev);
    setSurname('');
    setFirstName('');
    setJob('');
  };

  return (
    <form onSubmit={handleAddEmployee}>
      <input
        value={surname}
        placeholder="Фамилия"
        onChange={handleChangeSurname}
        required
      />
      <input
        value={firstName}
        placeholder="Имя"
        onChange={(e): void => {
          setFirstName(e.target.value);
        }}
        required
      />
      <input
        value={job}
        placeholder="Должность"
        onChange={(e): void => {
          setJob(e.target.value);
        }}
        required
      />
      <button type="submit">Добавить сотрудника</button>
    </form>
  );
};

export default EmployeeForm;
