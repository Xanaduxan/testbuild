import { useState } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Company from './components/Company';
import EmployeeList from './components/EmployeeList';
import FormCompany from './components/FormCompany';
import { selectedEmployees } from './features/employee/employeeSlice';

function App() {
  const [firmIds, setFirmIds] = useState<string[]>([]);
  const employees = useSelector(selectedEmployees);
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
          <EmployeeList firmIds={firmIds} employees={employees} />
        </div>
      </div>
    </>
  );
}

export default App;
