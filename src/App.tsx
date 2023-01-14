import { useState } from 'react';
import './App.css';
import Company from './components/Company';
import Employee from './components/Employee';

import FormCompany from './components/FormCompany';

function App() {
  const [firmIds, setFirmIds] = useState<number[]>([]);
  return (
    <>
      <h1>Список сотрудников</h1>
      <FormCompany />
      <div className="table-container">
        <Company firmIds={firmIds} setFirmIds={setFirmIds} />
        <Employee firmIds={firmIds} setFirmIds={setFirmIds} />
      </div>
    </>
  );
}

export default App;
