import { useSelector } from 'react-redux';

import { RootState } from '../store';
import CompanyRow from './CompanyRow';

const Company = () => {
  const { companies } = useSelector((state: RootState) => state.companies);

  return (
    <table>
      <thead>
        <tr>
          <th>
            Чекбокс
            <input type="checkbox" />
          </th>
          <th>Название компании</th>
          <th>Кол-во сотрудников</th>
          <th>Адрес</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {companies.map((company) => (
          <CompanyRow company={company} />
        ))}
      </tbody>
    </table>
  );
};

export default Company;
