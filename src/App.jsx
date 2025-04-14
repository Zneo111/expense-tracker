import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description && amount && date) {
      const newExpense = {
        id: Date.now(),
        description,
        amount: parseFloat(amount).toFixed(2),
        date: new Date(date).toLocaleDateString(), // Format date nicely
      };
      setExpenses([...expenses, newExpense]);
      setDescription('');
      setAmount('');
      setDate('');
    }
  };

  const handleDelete = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  const filteredExpenses = expenses.filter((expense) =>
    expense.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app-container">
      <h1>Expense Tracker</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button type="submit">Add Expense</button>
      </form>

      <input
        type="text"
        className="search-input"
        placeholder="Search by description"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount (KES)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.date}</td>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>
                <button onClick={() => handleDelete(expense.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
