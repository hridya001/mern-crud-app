import React, { useState } from 'react';
import axios from 'axios';

const Create = () => {
  const [data, setData] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/data', data); // Assuming `/api/data` is the route
      alert('Data created successfully');
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={data.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={data.email} onChange={handleChange} />
      <button type="submit">Create</button>
    </form>
  );
};

export default Create;
