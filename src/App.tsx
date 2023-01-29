import { useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import CompanyList from './components/CompanyList';

import EmployeeList from './components/EmployeeList';

import { selectEmployees } from './features/employee/employeeSlice';
import CompanyForm from './components/CompanyForm';

function App() {
  const [firmIds, setFirmIds] = useState<string[]>([]);
  const employees = useSelector(selectEmployees);
  return (
    <>
      <h1>Список сотрудников</h1>
      <CompanyForm />
      <div className="table-container">
        <div>
          {' '}
          <CompanyList
            firmIds={firmIds}
            setFirmIds={setFirmIds}
            employees={employees}
          />
        </div>
        <div>
          <EmployeeList firmIds={firmIds} employees={employees} />
        </div>
      </div>
    </>
  );
}

export default App;
