import { useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Company from './components/Company';
import Employee from './components/Employee';

import FormCompany from './components/FormCompany';
import { RootState } from './store';

function App() {
  const [firmIds, setFirmIds] = useState<number[]>([]);
  const { employees } = useSelector((state: RootState) => state.employees);
  return (
    <>
      <h1>Список сотрудников</h1>
      <FormCompany />
      <div className="table-container">
        <Company
          firmIds={firmIds}
          setFirmIds={setFirmIds}
          employees={employees}
        />
        <Employee
          firmIds={firmIds}
          setFirmIds={setFirmIds}
          employees={employees}
        />
      </div>
    </>
  );
}

export default App;
