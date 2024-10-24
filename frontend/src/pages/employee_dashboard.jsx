//import React from 'react';

const EmployeeDashboard = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Employee Dashboard</h1>
      <p>Welcome, Employee! Here you can manage inventory, update orders, and assist customers.</p>

      {/* Placeholder for future employee functionality */}
      <div style={{ marginTop: '20px' }}>
        <button style={{ padding: '10px 20px', fontSize: '16px' }}>Manage Inventory</button>
        <button style={{ padding: '10px 20px', fontSize: '16px', marginLeft: '10px' }}>Update Orders</button>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
