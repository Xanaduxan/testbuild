import { Dispatch, SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';
import { removeAllCompanies } from '../features/company/companySlice';
import { removeCompaniesEmployees } from '../features/employee/employeeSlice';
import { Employee } from '../features/employee/types/state';
import { RootState, useAppDispatch } from '../store';
import CompanyRow from './CompanyRow';

const Company = ({
  firmIds,
  setFirmIds,
  employees,
}: {
  firmIds: Array<number>;
  setFirmIds: Dispatch<SetStateAction<Array<number>>>;
  employees: Employee[];
}) => {
  const { companies } = useSelector((state: RootState) => state.companies);
  const companiesIds = companies.map((comp) => comp.id);
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
  const deleteSomeCompanies = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(removeAllCompanies(firmIds));
    dispatch(removeCompaniesEmployees(firmIds));
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
          <th>
            <button onClick={deleteSomeCompanies}>Удалить</button>
          </th>
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
            employees={employees}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Company;
