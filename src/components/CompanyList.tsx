import { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import {
  removeCompanies,
  selectCompanies,
} from '../features/company/companySlice';
import { removeEmployeesByCompanyIds } from '../features/employee/employeeSlice';
import { Employee } from '../features/employee/types/state';
import { useAppDispatch } from '../store';
import CompanyRow from './CompanyRow';

type CompanyProps = {
  firmIds: Array<string>;
  setFirmIds: Dispatch<SetStateAction<Array<string>>>;
  employees: Employee[];
};
const CompanyList = ({ firmIds, setFirmIds, employees }: CompanyProps) => {
  const companies = useSelector(selectCompanies);
  const companiesIds = companies.map((comp) => comp.id);

  const dispatch = useAppDispatch();
  const areAllCompaniesSelected =
    firmIds.length > 0 && firmIds.length === companies.length;
  const showDeleteAllButton =
    firmIds.length > 0 && firmIds.length === companies.length;
  const selectAllCompany = () => {
    areAllCompaniesSelected ? setFirmIds([]) : setFirmIds(companiesIds);
  };

  const deleteCompanies = () => {
    dispatch(removeCompanies(firmIds));
    dispatch(removeEmployeesByCompanyIds(firmIds));
    setFirmIds([]);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>
            Выделить все
            <input
              type="checkbox"
              checked={areAllCompaniesSelected}
              onChange={selectAllCompany}
            />
          </th>
          <th>Название компании</th>
          <th>Кол-во сотрудников</th>
          <th>Адрес</th>
          <th>
            {showDeleteAllButton && (
              <button onClick={deleteCompanies}>Удалить все</button>
            )}
          </th>
          <th>
            {!areAllCompaniesSelected && (
              <button onClick={deleteCompanies}>
                Удалить выбранные компании
              </button>
            )}
          </th>
        </tr>
      </thead>
      <tbody>
        {companies.map((company) => (
          <CompanyRow
            // chose={chose}
            // setChose={setChose}
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

export default CompanyList;
