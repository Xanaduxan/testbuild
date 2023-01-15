import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import employeeSlice, {
  removeAllCompanyEmployees,
} from '../features/employee/employeeSlice';
import { removeCompany, updateCompany } from '../features/company/companySlice';

import { useAppDispatch } from '../store';
import FormEmployee from './FormEmployee';
import { Company } from '../features/company/types/state';
import { Employee } from '../features/employee/types/state';

const CompanyRow = ({
  company,
  chose,
  setChose,
  firmIds,
  setFirmIds,
  employees,
  restartChooseCompany,
  setRestartChooseCompany,
}: {
  company: Company;
  chose: boolean;
  setChose: (callback: (chosen: boolean) => boolean) => void;
  firmIds: Array<number>;
  setFirmIds: Dispatch<SetStateAction<Array<number>>>;
  employees: Employee[];
  restartChooseCompany: boolean;
  setRestartChooseCompany: (callback: (chosen: boolean) => boolean) => void;
}) => {
  const [show, setShow] = useState(false);
  const [addForm, setAddForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [chosen, setChosen] = useState(false);
  const [companyName, setCompanyName] = useState(company.company);
  const [address, setAddress] = useState(company.address);
  useEffect(() => {
    if (restartChooseCompany) {
      setShow(() => false);
      setChosen(() => false);
      setChose(() => false);
    }
  }, [restartChooseCompany]);
  const handleChangeCompany = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCompanyName(e.target.value);
  };
  const handleChangeAddress = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAddress(e.target.value);
  };
  const listOfEmployees = employees.filter(
    (emp) => emp.companyId === company.id
  );

  const dispatch = useAppDispatch();
  const selectOneCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChosen((prevChose) => !prevChose);
    setShow((prev) => !prev);

    setFirmIds((prev) =>
      prev.includes(company.id)
        ? prev.filter((ind) => ind !== company.id)
        : [...prev, company.id]
    );
  };
  const deleteCompany = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(removeCompany(company.id));
    dispatch(removeAllCompanyEmployees(company.id));
    setChosen((prev) => !prev);
    setShow((prev) => !prev);
  };

  const editCompany = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(updateCompany({ id: company.id, address, company: companyName }));
    setEdit((prev) => !prev);
  };

  const addOneEmployee = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAddForm((prev) => !prev);
  };

  return (
    <tr key={company.id} className={chosen || chose ? 'selected' : ''}>
      <td>
        <input
          type="checkbox"
          checked={chosen || chose}
          onChange={selectOneCompany}
        />
      </td>
      <td>
        {edit ? (
          <input value={companyName} onChange={handleChangeCompany} required />
        ) : (
          <>{company.company}</>
        )}
      </td>
      <td>
        <>{listOfEmployees.length}</>
      </td>
      <td>
        {edit ? (
          <input value={address} onChange={handleChangeAddress} required />
        ) : (
          <>{company.address}</>
        )}
      </td>
      <td>
        {show && (
          <>
            <button type="button" onClick={deleteCompany}>
              Удалить
            </button>

            <button type="button" onClick={editCompany}>
              {edit ? 'Сохранить' : 'Редактировать'}
            </button>
            {addForm ? (
              <button type="button" onClick={addOneEmployee}>
                Не добавлять
              </button>
            ) : (
              <button type="button" onClick={addOneEmployee}>
                Добавить сотрудника
              </button>
            )}
          </>
        )}
      </td>
      <td>
        {addForm && chosen && (
          <FormEmployee
            companyIdOne={company.id}
            addForm={addForm}
            setAddForm={setAddForm}
          />
        )}
      </td>
    </tr>
  );
};

export default CompanyRow;
