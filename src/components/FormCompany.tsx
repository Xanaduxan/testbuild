import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { addCompany } from '../features/company/companySlice';

const FormCompany = () => {
  const [company, setCompany] = useState('');
  const [address, setAddress] = useState('');
  const dispatch = useAppDispatch();
  const { companies } = useSelector((state: RootState) => state.companies);
  const handleChangeCompany = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setCompany(e.target.value);
  };
  const handleChangeAddress = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAddress(e.target.value);
  };
  const handleAddCompany = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(
      addCompany({
        id: companies[companies.length - 1]?.id + 1,
        company,
        count: 0,
        address,
      })
    );
    setAddress('');
    setCompany('');
  };

  return (
    <form onSubmit={handleAddCompany}>
      <input value={company} onChange={handleChangeCompany} required />
      <input value={address} onChange={handleChangeAddress} required />
      <button type="submit">Добавить компанию</button>
    </form>
  );
};

export default FormCompany;
