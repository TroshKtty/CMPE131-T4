import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 0 });
  const [editItem, setEditItem] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // Fetch inventory data from an API or static source
    const fetchData = async () => {
      const data = await fetch('/api/inventory').then(res => res.json());
      setInventory(data);
    };
    fetchData();
  }, []);

  const handleAddItem = () => {
    setInventory([...inventory, newItem]);
    setNewItem({ name: '', quantity: 0 });
  };

  const handleEditItem = (index) => {
    const updatedInventory = inventory.map((item, i) => 
      i === index ? editItem : item
    );
    setInventory(updatedInventory);
    setEditItem(null);
    setEditIndex(null);
  };

  const handleDeleteItem = (index) => {
    const updatedInventory = inventory.filter((_, i) => i !== index);
    setInventory(updatedInventory);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Inventory Management</h1>
      <div className="mb-4">
        <input 
          type="text" 
          className="form-control mb-2" 
          placeholder="Item Name" 
          value={newItem.name} 
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} 
        />
        <input 
          type="number" 
          className="form-control mb-2" 
          placeholder="Quantity" 
          value={newItem.quantity} 
          onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value) })} 
        />
        <button className="btn btn-primary" onClick={handleAddItem}>Add Item</button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>
                <button className="btn btn-warning btn-sm mr-2" onClick={() => { setEditItem(item); setEditIndex(index); }}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteItem(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editItem && (
        <div className="mt-4">
          <input 
            type="text" 
            className="form-control mb-2" 
            placeholder="Item Name" 
            value={editItem.name} 
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })} 
          />
          <input 
            type="number" 
            className="form-control mb-2" 
            placeholder="Quantity" 
            value={editItem.quantity} 
            onChange={(e) => setEditItem({ ...editItem, quantity: parseInt(e.target.value) })} 
          />
          <button className="btn btn-success" onClick={() => handleEditItem(editIndex)}>Save</button>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;