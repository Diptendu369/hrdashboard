import React, { useState } from 'react';

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; email: string; age: number; department: string }) => void;
}

const departments = ['HR', 'Engineering', 'Sales', 'Marketing', 'Finance'];

const UserFormModal: React.FC<UserFormModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = useState({ name: '', email: '', age: '', department: departments[0] });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.age) {
      setError('All fields are required');
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      setError('Invalid email');
      return;
    }
    setError('');
    onSubmit({ ...form, age: Number(form.age) });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <form className="bg-white dark:bg-gray-900 p-6 rounded shadow w-full max-w-md box-hover-animate" onSubmit={handleSubmit}>
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Create User</h2>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full mb-2 p-2 border rounded text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
        />
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full mb-2 p-2 border rounded text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
        />
        <input
          name="age"
          value={form.age}
          onChange={handleChange}
          placeholder="Age"
          type="number"
          className="w-full mb-2 p-2 border rounded text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 placeholder-gray-400 dark:placeholder-gray-500"
        />
        <select
          name="department"
          value={form.department}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800"
        >
          {departments.map(dep => (
            <option key={dep} value={dep}>{dep}</option>
          ))}
        </select>
        <div className="flex gap-2 justify-end">
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn btn-primary">Create</button>
        </div>
      </form>
    </div>
  );
};

export default UserFormModal; 