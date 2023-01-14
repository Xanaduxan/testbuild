import { useState } from 'react';
import './App.css';
import Company from './components/Company';
import Employee from './components/Employee';

import FormCompany from './components/FormCompany';

function App() {
  const [firmId, setFirmId] = useState<number[]>([]);
  return (
    <>
      <FormCompany />
      <div className="table-container">
        <Company firmId={firmId} setFirmId={setFirmId} />
        <Employee firmId={firmId} setFirmId={setFirmId} />
      </div>
    </>
  );
}

export default App;
