import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store';
import { addCompany, selectCompanies } from '../features/company/companySlice';

const CompanyForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const dispatch = useAppDispatch();
  const companies = useSelector(selectCompanies);

  const handleAddCompany = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = name + companies.length;
    dispatch(addCompany({ id, name, address }));

    setAddress('');
    setName('');
  };

  return (
    <form onSubmit={handleAddCompany}>
      <input
        value={name}
        placeholder="Компания"
        onChange={(e): void => {
          setName(e.target.value);
        }}
        required
      />
      <input
        value={address}
        placeholder="Адрес"
        onChange={(e): void => {
          setAddress(e.target.value);
        }}
        required
      />
      <button type="submit">Добавить компанию</button>
    </form>
  );
};

export default CompanyForm;
