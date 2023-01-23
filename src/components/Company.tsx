import { Dispatch, SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  removeSomeCompanies,
  selectCompanies,
} from '../features/company/companySlice';
import { removeCompaniesEmployees } from '../features/employee/employeeSlice';
import { Employee } from '../features/employee/types/state';
import { RootState, useAppDispatch } from '../store';
import CompanyRow from './CompanyRow';

type Props = {
  firmIds: Array<string>;
  setFirmIds: Dispatch<SetStateAction<Array<string>>>;
  employees: Employee[];
};
const Company = ({ firmIds, setFirmIds, employees }: Props) => {
  const companies = useSelector(selectCompanies);
  const companiesIds = companies.map((comp) => comp.id);
  const [chose, setChose] = useState(false);
  const [notAllCompanySelected, setNotAllCompanySelected] = useState(true);
  const [restartChooseCompany, setRestartChooseCompany] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const dispatch = useAppDispatch();
  const selectAllCompany = () => {
    setChose((prev) => !prev);
    setShowDelete((prev) => !prev);
    setNotAllCompanySelected((prev) => !prev);
  };
  const deleteAllCompanies = () => {
    dispatch(removeSomeCompanies(companiesIds));
    dispatch(removeCompaniesEmployees(companiesIds));
    setRestartChooseCompany((prev) => !prev);
    setChose((prev) => !prev);
  };
  const deleteSomeCompanies = () => {
    dispatch(removeSomeCompanies(firmIds));
    dispatch(removeCompaniesEmployees(firmIds));
    setFirmIds([]);
    setRestartChooseCompany((prev) => !prev);
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
            {notAllCompanySelected && (
              <button onClick={deleteSomeCompanies}>
                Удалить выбранные компании
              </button>
            )}
          </th>
        </tr>
      </thead>
      <tbody>
        {companies.map((company) => (
          <CompanyRow
            chose={chose}
            setChose={setChose}
            company={company}
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
