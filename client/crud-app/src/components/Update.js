import React, { useState } from 'react';
import axios from 'axios';

const Update = ({ id }) => {
  const [data, setData] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/data/${id}`, data); // Assuming `/api/data/:id` is the route
      alert('Data updated successfully');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={data.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={data.email} onChange={handleChange} />
      <button type="submit">Update</button>
    </form>
  );
};

export default Update;
