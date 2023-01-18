import { useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Company from './components/Company';
import Employee from './components/Employee';

import FormCompany from './components/FormCompany';
import { RootState } from './store';

function App() {
  const [firmIds, setFirmIds] = useState<string[]>([]);
  const { employees } = useSelector((state: RootState) => state.employees);
  return (
    <>
      <h1>Список сотрудников</h1>
      <FormCompany />
      <div className="table-container">
        <div>
          {' '}
          <Company
            firmIds={firmIds}
            setFirmIds={setFirmIds}
            employees={employees}
          />
        </div>
        <div>
          <Employee
            firmIds={firmIds}
            setFirmIds={setFirmIds}
            employees={employees}
          />
        </div>
      </div>
    </>
  );
}

export default App;
