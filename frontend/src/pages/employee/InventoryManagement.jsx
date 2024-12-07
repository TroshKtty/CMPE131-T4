import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/joy";
import EmployeeSidebar from "@/components/employee_navbar/employee_navbar";

const BootstrapProvider = ({ children }) => {
  useEffect(() => {
    const bootstrap = document.createElement("link");
    bootstrap.rel = "stylesheet";
    bootstrap.href =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
    document.head.appendChild(bootstrap);

    return () => {
      document.head.removeChild(bootstrap);
    };
  }, []);

  return <>{children}</>;
};

const InventoryManagement = () => {
  const [inventory, setInventory] = useState([]);
  const [newItem, setNewItem] = useState({
    name: "",
    price: 0,
    weight: 0,
    category: "",
    quantity: 0,
    images: "",
    descriptions: "",
    nutritionInfo: "",
    specifications: "",
  });
  const [editItem, setEditItem] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const addFormRef = useRef(null);
  const editFormRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/products/all");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInventory(data);
      } catch (error) {
        console.error("Failed to fetch inventory", error);
        setError("Failed to fetch inventory");
      }
    };

    fetchData();
  }, []);

  const validateNumber = (value, fieldName) => {
    let numValue = Number.parseFloat(value);
    if (fieldName.toLowerCase() === "quantity") {
      numValue = Number.parseInt(value, 10);
    }

    if (numValue < 0) {
      setError(`${fieldName} cannot be negative`);
      return false;
    }
    return true;
  };

  const handleAddNewItemClick = () => {
    setShowAddForm(true);
    setError("");
    setTimeout(() => {
      if (addFormRef.current) {
        addFormRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  const handleAddItem = async () => {
    try {
      if (
        !newItem.name ||
        !newItem.category ||
        !newItem.descriptions ||
        !newItem.nutritionInfo ||
        !newItem.specifications
      ) {
        setError("Please fill in all required fields.");
        return;
      }

      if (
        !validateNumber(newItem.price, "Price") ||
        !validateNumber(newItem.weight, "Weight") ||
        !validateNumber(newItem.quantity, "Quantity")
      ) {
        return;
      }

      const response = await fetch("http://localhost:3000/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to add item");
      }

      setInventory([...inventory, result]);

      setNewItem({
        name: "",
        price: 0,
        weight: 0,
        category: "",
        quantity: 0,
        images: "",
        descriptions: "",
        nutritionInfo: "",
        specifications: "",
      });

      setShowAddForm(false);
      setError("");
    } catch (error) {
      console.error("Failed to add item", error);
      setError(error.message);
    }
  };

  const handleEditItem = async () => {
    if (!editItem || editIndex === null) {
      console.error("Edit item or index is null:", editItem, editIndex);
      return;
    }

    if (
      !validateNumber(editItem.price, "Price") ||
      !validateNumber(editItem.weight, "Weight") ||
      !validateNumber(editItem.quantity, "Quantity")
    ) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/products/${editItem.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editItem),
        }
      );
      if (!response.ok)
        throw new Error(`Failed to update the item: ${response.statusText}`);
      const updatedItem = await response.json();
      const updatedInventory = [...inventory];
      updatedInventory[editIndex] = updatedItem;
      setInventory(updatedInventory);
      setEditItem(null);
      setError("");
    } catch (error) {
      console.error("Error updating item:", error);
      setError("Error updating item");
    }
  };

  const handleNumberInput = (e, fn, obj, field) => {
    let value = Number.parseFloat(e.target.value) || 0;
    if (field === "quantity") {
      value = Number.parseInt(e.target.value, 10) || 0;
    }

    if (value >= 0) {
      fn({ ...obj, [field]: value });
      setError("");
    } else {
      // Titlecase the field name
      setError(
        `${
          field.charAt(0).toUpperCase() + field.slice(1).toLowerCase()
        } cannot be negative`
      );
    }
  };

  const handleEditClick = (item, index) => {
    setEditItem({ ...item });
    setEditIndex(index);
    setError("");
    setTimeout(() => {
      if (editFormRef.current) {
        editFormRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 0);
  };

  const handleCancelEdit = () => {
    setEditItem(null);
    setEditIndex(null);
    setError("");
  };

  const handleDeleteItem = async (index) => {
    const item = inventory[index];
    if (!item.id) return;
    try {
      const response = await fetch(
        `http://localhost:3000/products/${item.id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete the item");
      setInventory(inventory.filter((_, idx) => idx !== index));
      setError("");
    } catch (error) {
      console.error("Error deleting item:", error);
      setError("Error deleting item");
    }
  };

  return (
    <BootstrapProvider>
      <>
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
          <Box sx={{ width: "250px", flexShrink: 0 }}>
            <EmployeeSidebar />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div className="container mt-5">
              <style>
                {`
                  .table { width: 100%; table-layout: fixed; }
                  .table th, .table td { text-align: left; vertical-align: middle; padding: 8px; }
                  .table th { background-color: #f2f2f2; }
                  .btn { margin-right: 8px; }
                  .add-button-container { display: flex; justify-content: flex-end; margin-bottom: 10px; }
                `}
              </style>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="mb-0">Inventory Management</h1>
                <button
                  className="btn btn-primary"
                  onClick={handleAddNewItemClick}
                >
                  Add New Item
                </button>
              </div>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th style={{ width: "5%" }}>#</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Weight</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {inventory.map((item, index) => (
                    <tr key={item.id || index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>{item.weight}</td>
                      <td>{item.category}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm mr-2"
                          onClick={() => handleEditClick(item, index)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDeleteItem(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {editItem && (
                <div className="mt-4" ref={editFormRef}>
                  <h3>Edit Item</h3>
                  <label className="form-label">Item Name</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={editItem.name}
                    onChange={(e) =>
                      setEditItem({ ...editItem, name: e.target.value })
                    }
                  />
                  <label className="form-label">Quantity</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control mb-2"
                    value={editItem.quantity}
                    onChange={(e) =>
                      handleNumberInput(e, setEditItem, editItem, "quantity")
                    }
                  />
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control mb-2"
                    value={editItem.price}
                    onChange={(e) =>
                      handleNumberInput(e, setEditItem, editItem, "price")
                    }
                  />
                  <label className="form-label">Weight</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control mb-2"
                    value={editItem.weight}
                    onChange={(e) =>
                      handleNumberInput(e, setEditItem, editItem, "weight")
                    }
                  />
                  <button className="btn btn-success" onClick={handleEditItem}>
                    Save Changes
                  </button>
                  <button
                    className="btn btn-secondary ml-2"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              )}
              {showAddForm && (
                <div className="mt-4" ref={addFormRef}>
                  <h3>Add New Item</h3>
                  <label className="form-label">Item Name</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                  />
                  <label className="form-label">Quantity</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control mb-2"
                    value={newItem.quantity}
                    onChange={(e) =>
                      handleNumberInput(e, setNewItem, newItem, "quantity")
                    }
                  />
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control mb-2"
                    value={newItem.price}
                    onChange={(e) =>
                      handleNumberInput(e, setNewItem, newItem, "price")
                    }
                  />
                  <label className="form-label">Weight</label>
                  <input
                    type="number"
                    min="0"
                    className="form-control mb-2"
                    value={newItem.weight}
                    onChange={(e) =>
                      handleNumberInput(e, setNewItem, newItem, "weight")
                    }
                  />
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={newItem.category}
                    onChange={(e) =>
                      handleNumberInput(e, setEditItem, editItem, "category")
                    }
                  />
                  <label className="form-label">
                    Images (comma-separated URLs)
                  </label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    value={newItem.images}
                    onChange={(e) =>
                      setNewItem({ ...newItem, images: e.target.value })
                    }
                  />
                  <label className="form-label">Descriptions</label>
                  <textarea
                    className="form-control mb-2"
                    value={newItem.descriptions}
                    onChange={(e) =>
                      setNewItem({ ...newItem, descriptions: e.target.value })
                    }
                  />
                  <label className="form-label">Nutrition Info</label>
                  <textarea
                    className="form-control mb-2"
                    value={newItem.nutritionInfo}
                    onChange={(e) =>
                      setNewItem({ ...newItem, nutritionInfo: e.target.value })
                    }
                  />
                  <label className="form-label">Specifications</label>
                  <textarea
                    className="form-control mb-2"
                    value={newItem.specifications}
                    onChange={(e) =>
                      setNewItem({ ...newItem, specifications: e.target.value })
                    }
                  />
                  <button
                    className="btn btn-primary mt-2"
                    onClick={handleAddItem}
                  >
                    Add Item
                  </button>
                  <button
                    className="btn btn-secondary mt-2 ml-2"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </Box>
        </Box>
      </>
    </BootstrapProvider>
  );
};

export default InventoryManagement;
