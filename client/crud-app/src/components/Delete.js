import React from 'react';
import axios from 'axios';

const Delete = ({ id }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/data/${id}`); // Assuming `/api/data/:id` is the route
      alert('Data deleted successfully');
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default Delete;
