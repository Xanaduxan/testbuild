import { Dispatch, SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';
import { removeSomeCompanies } from '../features/company/companySlice';
import { removeCompaniesEmployees } from '../features/employee/employeeSlice';
import { Employee } from '../features/employee/types/state';
import { RootState, useAppDispatch } from '../store';
import CompanyRow from './CompanyRow';

const Company = ({
  firmIds,
  setFirmIds,
  employees,
}: {
  firmIds: Array<string>;
  setFirmIds: Dispatch<SetStateAction<Array<string>>>;
  employees: Employee[];
}) => {
  const { companies } = useSelector((state: RootState) => state.companies);
  const companiesIds = companies.map((comp) => comp.id);
  const [chose, setChose] = useState(false);
  const [restartChooseCompany, setRestartChooseCompany] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const dispatch = useAppDispatch();
  const selectAllCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChose((prevChose) => !prevChose);
    setShowDelete((prev) => !prev);
    setRestartChooseCompany(() => false);
  };
  const deleteAllCompanies = (e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(removeSomeCompanies(companiesIds));
    dispatch(removeCompaniesEmployees(companiesIds));
    setRestartChooseCompany((prev) => !prev);
  };
  const deleteSomeCompanies = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(firmIds);
    dispatch(removeSomeCompanies(firmIds));
    dispatch(removeCompaniesEmployees(firmIds));
    setRestartChooseCompany(() => true);
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
            <button onClick={deleteSomeCompanies}>Удалить выбранное</button>
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
            restartChooseCompany={restartChooseCompany}
            setRestartChooseCompany={setRestartChooseCompany}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Company;
