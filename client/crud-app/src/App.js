import React from 'react';
import Create from './components/Create';
import Update from './components/Update';
import Delete from './components/Delete';

function App() {
  return (
    <div>
      <h1>CRUD Application</h1>
      <Create />
      <Update id="1" />  {/* Replace "1" with the actual ID you want to update */}
      <Delete id="1" />  {/* Replace "1" with the actual ID you want to delete */}
    </div>
  );
}

export default App;
