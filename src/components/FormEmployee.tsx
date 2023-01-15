import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { addEmployee } from '../features/employee/employeeSlice';
import { Employee } from '../features/employee/types/state';
import { RootState, useAppDispatch } from '../store';

const FormEmployee = ({
  companyIdOne,
  addForm,
  setAddForm,
}: {
  companyIdOne: string;
  addForm: boolean;
  setAddForm: (callback: (addForm: boolean) => boolean) => void;
}) => {
  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [job, setJob] = useState('');
  const dispatch = useAppDispatch();
  const { employees } = useSelector((state: RootState) => state.employees);
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
  function uniqueId(len: number, employees: Employee[]): number {
    const employeesIds = employees.map((employee) => employee.id);
    if (!employeesIds.includes(len)) {
      return len;
    } else {
      len += 1;
      return uniqueId(len, employees);
    }
  }
  const handleAddEmployee = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newId = uniqueId(employees.length, employees);
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
