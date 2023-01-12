import React, { useState } from 'react';
import { initEmployees } from '../features/employee/employeeSlice';
import { selectCompany } from '../features/company/companySlice';
import { Company } from '../features/company/types/state';
import { useAppDispatch } from '../store';

const CompanyRow = ({ company }: { company: Company }) => {
  const [chosen, setChosen] = useState(false);

  const dispatch = useAppDispatch();
  const selectOneCompany = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChosen((prevChose) => !prevChose);

    if (e.target.checked) {
      dispatch(selectCompany(company.id));
      dispatch(initEmployees(company.id));
    }
  };
  return (
    <tr key={company.id} className={chosen ? 'selected' : ''}>
      <td>
        <input type="checkbox" checked={chosen} onChange={selectOneCompany} />
      </td>
      <td>{company.company}</td>
      <td>{company.count}</td>
      <td>{company.address}</td>
    </tr>
  );
};

export default CompanyRow;
