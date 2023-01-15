import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { addCompany } from '../features/company/companySlice';
import { Company } from '../features/company/types/state';

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
        id: company,
        company,
        address,
      })
    );

    setAddress('');
    setCompany('');
  };

  return (
    <form onSubmit={handleAddCompany}>
      <input
        value={company}
        placeholder="Компания"
        onChange={handleChangeCompany}
        required
      />
      <input
        value={address}
        placeholder="Адрес"
        onChange={handleChangeAddress}
        required
      />
      <button type="submit">Добавить компанию</button>
    </form>
  );
};

export default FormCompany;
