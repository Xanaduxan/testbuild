import React, { Dispatch, SetStateAction, useState } from 'react';
import { removeAllCompanyEmployees } from '../features/employee/employeeSlice';
import { removeCompany, updateCompany } from '../features/company/companySlice';

import { useAppDispatch } from '../store';
import EmployeeForm from './EmployeeForm';
import { Company } from '../features/company/types/state';
import { Employee } from '../features/employee/types/state';

type Props = {
  company: Company;

  firmIds: Array<string>;
  setFirmIds: Dispatch<SetStateAction<Array<string>>>;
  employees: Employee[];
};
const CompanyRow = ({
  company,

  firmIds,
  setFirmIds,
  employees,
}: Props) => {
  const [showAddEmployeeForm, setshowAddEmployeeForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [companyName, setCompanyName] = useState(company.name);
  const [address, setAddress] = useState(company.address);

  const listOfEmployees = employees.filter(
    (emp) => emp.companyId === company.id
  );

  const dispatch = useAppDispatch();
  const selectCompany = () => {
    setFirmIds((prev) =>
      prev.includes(company.id)
        ? prev.filter((ind) => ind !== company.id)
        : [...prev, company.id]
    );
  };
  const deleteCompany = () => {
    dispatch(removeCompany(company.id));
    dispatch(removeAllCompanyEmployees(company.id));

    firmIds = firmIds.filter((firm) => company.id);
  };

  const onSave = () => {
    if (address !== company.address || company.name !== companyName) {
      dispatch(updateCompany({ id: company.id, address, name: companyName }));
    }

    setIsEditing((prev) => !prev);
  };

  const toggleEmployeeForm = () => {
    setshowAddEmployeeForm((prev) => !prev);
  };

  return (
    <tr
      key={company.id}
      className={firmIds.includes(company.id) ? 'selected' : ''}
    >
      <td>
        <input
          type="checkbox"
          checked={firmIds.includes(company.id)}
          onChange={selectCompany}
        />
      </td>
      <td>
        {isEditing ? (
          <input
            value={companyName}
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
            required
          />
        ) : (
          <>{company.name}</>
        )}
      </td>
      <td>
        <>{listOfEmployees.length}</>
      </td>
      <td>
        {isEditing ? (
          <input
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            required
          />
        ) : (
          <>{company.address}</>
        )}
      </td>
      <td>
        {firmIds.includes(company.id) && (
          <>
            <button type="button" onClick={deleteCompany}>
              Удалить
            </button>

            <button
              type="button"
              onClick={() => (!isEditing ? setIsEditing(true) : onSave())}
            >
              {isEditing ? 'Сохранить' : 'Редактировать'}
            </button>
            {showAddEmployeeForm ? (
              <button type="button" onClick={toggleEmployeeForm}>
                Не добавлять
              </button>
            ) : (
              <button type="button" onClick={toggleEmployeeForm}>
                Добавить сотрудника
              </button>
            )}
          </>
        )}
      </td>
      <td>
        {showAddEmployeeForm && (
          <EmployeeForm
            companyId={company.id}
            setshowAddEmployeeForm={setshowAddEmployeeForm}
          />
        )}
      </td>
    </tr>
  );
};

export default CompanyRow;
