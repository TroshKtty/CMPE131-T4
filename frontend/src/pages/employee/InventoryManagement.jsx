import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 0, price: 0, weight: 0 });
  const [editItem, setEditItem] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/products/all');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInventory(data);
      } catch (error) {
        console.error('Failed to fetch inventory', error);
        setError('Failed to fetch inventory');
      }
    };

    fetchData();
  }, []);

  // Comment out handleAddItem function to disable add new item functionality
  // const handleAddItem = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/products/add', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         name: newItem.name,
  //         quantity: newItem.quantity,
  //         price: newItem.price,
  //         weight: newItem.weight
  //       })
  //     });
  //     if (!response.ok) throw new Error('Failed to add item');
  //     const addedItem = await response.json();
  //     setInventory([...inventory, addedItem]);
  //     setNewItem({ name: '', quantity: 0, price: 0, weight: 0 }); // Reset form
  //   } catch (error) {
  //     console.error('Failed to add item', error);
  //     setError('Failed to add item');
  //   }
  // };

  const handleEditItem = async () => {
    if (!editItem || editIndex === null) {
      console.error('Edit item or index is null:', editItem, editIndex);
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/products/${editItem.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editItem)
      });
      if (!response.ok) throw new Error(`Failed to update the item: ${response.statusText}`);
      const updatedItem = await response.json();
      const updatedInventory = [...inventory];
      updatedInventory[editIndex] = updatedItem;
      setInventory(updatedInventory);
      setEditItem(null); // Clear edit state
    } catch (error) {
      console.error('Error updating item:', error);
      setError('Error updating item');
    }
  };

  const handleDeleteItem = async (index) => {
    const item = inventory[index];
    if (!item.id) return; // Check for item id
    try {
      const response = await fetch(`http://localhost:3000/products/${item.id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete the item');
      setInventory(inventory.filter((_, idx) => idx !== index)); // Remove from list
    } catch (error) {
      console.error('Error deleting item:', error);
      setError('Error deleting item');
    }
  };

  return (
    <div className="container mt-5">
      <style>
        {`
          .table {
              width: 100%;
              table-layout: fixed;
          }
          .table th, .table td {
              text-align: left;
              vertical-align: middle;
              padding: 8px;
          }
          .table th {
              background-color: #f2f2f2;
          }
          .btn {
              margin-right: 8px;
          }
        `}
      </style>
      <h1 className="mb-4">Inventory Management</h1>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <div className="mb-4">
        {/* Inputs and add button commented out to disable adding new items */}
        {/* <label className="form-label">Item Name</label>
        <input 
          type="text" 
          className="form-control mb-2" 
          placeholder="Item Name" 
          value={newItem.name} 
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <label className="form-label">Quantity</label>
        <input 
          type="number" 
          className="form-control mb-2" 
          placeholder="Quantity" 
          value={newItem.quantity} 
          onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value, 10) || 0 })}
        />
        <label className="form-label">Price</label>
        <input 
          type="number" 
          className="form-control mb-2" 
          placeholder="Price" 
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) || 0 })}
        />
        <label className="form-label">Weight</label>
        <input 
          type="number" 
          className="form-control mb-2" 
          placeholder="Weight" 
          value={newItem.weight}
          onChange={(e) => setNewItem({ ...newItem, weight: parseFloat(e.target.value) || 0 })}
        />
        <button className="btn btn-primary" onClick={handleAddItem}>Add Item</button> */}
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
                <button className="btn btn-warning btn-sm mr-2" onClick={() => { setEditItem({...item}); setEditIndex(index); }}>Edit</button>
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
            onChange={(e) => setEditItem({ ...editItem, quantity: parseInt(e.target.value, 10) || 0 })}
          />
          <button className="btn btn-success" onClick={handleEditItem}>Save Changes</button>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;
