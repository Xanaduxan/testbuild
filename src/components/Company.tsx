import { Dispatch, SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';
import { removeAllCompanies } from '../features/company/companySlice';
import {
  removeCompaniesEmployees,
  removeCompanyEmployees,
} from '../features/employee/employeeSlice';

import { RootState, useAppDispatch } from '../store';
import CompanyRow from './CompanyRow';

const Company = ({
  firmIds,
  setFirmIds,
}: {
  firmIds: Array<number>;
  setFirmIds: Dispatch<SetStateAction<Array<number>>>;
}) => {
  const { companies } = useSelector((state: RootState) => state.companies);
  let companiesIds = companies.map((comp) => comp.id);
  const [chose, setChose] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const dispatch = useAppDispatch();
  const selectAllCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChose((prevChose) => !prevChose);
    setShowDelete((prev) => !prev);
  };
  const deleteAllCompanies = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(removeAllCompanies(companiesIds));
    dispatch(removeCompaniesEmployees(companiesIds));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>
            Выделить все
            <input
              type="checkbox"
              checked={chose}
              onChange={selectAllCompany}
            />
          </th>
          <th>Название компании</th>
          <th>Кол-во сотрудников</th>
          <th>Адрес</th>
          <th>
            {showDelete && (
              <button onClick={deleteAllCompanies}>Удалить все</button>
            )}
          </th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {companies.map((company) => (
          <CompanyRow
            chose={chose}
            setChose={setChose}
            company={company}
            firmIds={firmIds}
            setFirmIds={setFirmIds}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Company;
