

import './index.css';


import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setData((prevData) => [...prevData, formData]);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    });
  };

  const handleDelete = (index) => {
    setData((prevData) => prevData.filter((_, i) => i !== index));
  };

  const handleClone = (index) => {
    const clonedData = [...data];
    clonedData.splice(index + 1, 0, { ...clonedData[index] });
    setData(clonedData);
  };

  const filteredData = data.filter(
    (item) =>
      item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='container'>
      <h1>Task 4</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          First Name:
          <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.email}</td>
              <td>{item.password}</td>
              <td>
                <button onClick={() => handleDelete(index)}>Delete</button>
                <button onClick={() => handleClone(index)}>Clone</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

