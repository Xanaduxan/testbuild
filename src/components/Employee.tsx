import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Employee = () => {
  const { employees } = useSelector((state: RootState) => state.employees);
  return (
    <table>
      <thead>
        <tr>
          <th>
            Чекбокс
            <input type="checkbox" />
          </th>
          <th>Фамилия</th>
          <th>Имя</th>
          <th>Должность</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>
              <input type="checkbox" />
            </td>
            <td>{employee.surname}</td>
            <td>{employee.name}</td>
            <td>{employee.job}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Employee;
