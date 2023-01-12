import './App.css';
import Company from './components/Company';
import Employee from './components/Employee';

import FormCompany from './components/FormCompany';

function App() {
  return (
    <div className="table-container">
      <FormCompany />
      <Company />
      <Employee />
    </div>
  );
}

export default App;
