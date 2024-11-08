import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: 0 });
  const [editItem, setEditItem] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/product');
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

  const handleAddItem = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/product/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem)
      });
      if (response.ok) {
        const addedItem = await response.json();
        setInventory([...inventory, addedItem]);
        setNewItem({ name: '', quantity: 0 });  // Reset the newItem input after adding
      } else {
        throw new Error('Failed to add item');
      }
    } catch (error) {
      console.error('Failed to add item', error);
      setError('Failed to add item');
    }
  };

  const handleEditItem = async () => {
    if (editItem && editIndex != null) {
      try {
        const response = await fetch(`http://localhost:3000/api/product/update/${editItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editItem)
        });
        if (response.ok) {
          const updatedItem = await response.json();
          const updatedInventory = inventory.map((item, i) =>
            i === editIndex ? updatedItem : item
          );
          setInventory(updatedInventory);
          setEditItem(null);
          setEditIndex(null);
        } else {
          throw new Error('Failed to update item');
        }
      } catch (error) {
        console.error('Failed to update item', error);
        setError('Failed to update item');
      }
    }
  };

  const handleDeleteItem = async (index) => {
    const itemToDelete = inventory[index];
    try {
      const response = await fetch(`http://localhost:3000/api/product/delete/${itemToDelete.id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        const updatedInventory = inventory.filter((_, i) => i !== index);
        setInventory(updatedInventory);
      } else {
        throw new Error('Failed to delete item');
      }
    } catch (error) {
      console.error('Failed to delete item', error);
      setError('Failed to delete item');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Inventory Management</h1>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
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
          onChange={(e) => setNewItem({ ...newItem, quantity: parseInt(e.target.value, 10) || 0 })}
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
