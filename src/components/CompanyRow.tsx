import React, { useState } from 'react';
import { initEmployees } from '../features/employee/employeeSlice';
import {
  removeCompany,
  selectCompany,
  updateCompany,
} from '../features/company/companySlice';
import { Company } from '../features/company/types/state';
import { useAppDispatch } from '../store';

const CompanyRow = ({ company }: { company: Company }) => {
  const [chosen, setChosen] = useState(false);
  const [show, setShow] = useState(false);
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
    if (e.target.checked) {
      dispatch(selectCompany(company.id));
      dispatch(initEmployees(company.id));
    }
  };
  const deleteCompany = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(removeCompany(company.id));
  };
  const editCompany = (e: React.MouseEvent<HTMLButtonElement>) => {
    setEdit((prev) => !prev);
  };
  const saveCompany = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(updateCompany({ id: company.id, address, company: companyName }));
    setEdit((prev) => !prev);
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
          </>
        )}
      </td>
    </tr>
  );
};

export default CompanyRow;
