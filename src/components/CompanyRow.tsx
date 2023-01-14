import React, { Dispatch, SetStateAction, useState } from 'react';
import { removeCompanyEmployees } from '../features/employee/employeeSlice';
import { removeCompany, updateCompany } from '../features/company/companySlice';
import { Company } from '../features/company/types/state';
import { useAppDispatch } from '../store';
import FormEmployee from './FormEmployee';

const CompanyRow = ({
  company,
  showEmployee,
  setShowEmployee,
  firmId,
  setFirmId,
}: {
  company: Company;
  showEmployee: boolean;
  setShowEmployee: (callback: (showEmployee: boolean) => boolean) => void;
  firmId: Array<number>;
  setFirmId: Dispatch<SetStateAction<Array<number>>>;
}) => {
  const [chosen, setChosen] = useState(false);
  const [show, setShow] = useState(false);
  const [addForm, setAddForm] = useState(false);
  const [edit, setEdit] = useState(false);
  const [companyName, setCompanyName] = useState(company.company);
  const [address, setAddress] = useState(company.address);
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

  const dispatch = useAppDispatch();
  const selectOneCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChosen((prevChose) => !prevChose);
    setShow((prev) => !prev);
    setShowEmployee((pr) => !pr);
    setFirmId((prev) =>
      prev.includes(company.id)
        ? prev.filter((ind) => ind !== company.id)
        : [...prev, company.id]
    );
  };
  const deleteCompany = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(removeCompany(company.id));
    dispatch(removeCompanyEmployees(company.id));
  };
  const editCompany = (e: React.MouseEvent<HTMLButtonElement>) => {
    setEdit((prev) => !prev);
  };
  const saveCompany = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(updateCompany({ id: company.id, address, company: companyName }));
    setEdit((prev) => !prev);
  };
  const addOneEmployee = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAddForm((prev) => !prev);
  };
  return (
    <tr key={company.id} className={chosen ? 'selected' : ''}>
      <td>
        <input type="checkbox" checked={chosen} onChange={selectOneCompany} />
      </td>
      <td>
        {company.company}
        {edit && (
          <input value={companyName} onChange={handleChangeCompany} required />
        )}
      </td>
      <td>{company.count}</td>
      <td>
        {company.address}
        {edit && (
          <input value={address} onChange={handleChangeAddress} required />
        )}
      </td>
      <td>
        {show && (
          <>
            <button type="button" onClick={deleteCompany}>
              Удалить
            </button>
            <button type="button" onClick={editCompany}>
              Редактировать
            </button>
            <button type="button" onClick={saveCompany}>
              Сохранить изменения
            </button>
            <button type="button" onClick={addOneEmployee}>
              Добавить сотрудника
            </button>
          </>
        )}
      </td>
      <td>
        {addForm && (
          <FormEmployee
            companyId={company.id}
            addForm={addForm}
            setAddForm={setAddForm}
          />
        )}
      </td>
    </tr>
  );
};

export default CompanyRow;
