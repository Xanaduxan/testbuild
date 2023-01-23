import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  addEmployee,
  selectedEmployees,
} from '../features/employee/employeeSlice';
import { useAppDispatch } from '../store';

type Props = {
  companyIdOne: string;
  setAddForm: (callback: (addForm: boolean) => boolean) => void;
};

const FormEmployee = ({ companyIdOne, setAddForm }: Props) => {
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const dispatch = useAppDispatch();
  const employees = useSelector(selectedEmployees);
  const handleChangeSurname = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSurname(e.target.value);
  };
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };
  const handleChangeJob = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setJob(e.target.value);
  };

  const handleAddEmployee = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newId = surname + name + employees.length;
    dispatch(
      addEmployee({
        id: newId,
        surname,
        name,
        job,
        companyId: companyIdOne,
      })
    );

    setAddForm((prev) => !prev);
    setSurname('');
    setName('');
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
        value={name}
        placeholder="Имя"
        onChange={handleChangeName}
        required
      />
      <input
        value={job}
        placeholder="Должность"
        onChange={handleChangeJob}
        required
      />
      <button type="submit">Добавить сотрудника</button>
    </form>
  );
};

export default FormEmployee;
