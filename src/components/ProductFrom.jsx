
import { useEffect, useState } from "react";

function ProductForm({
  onAddProduct,
  selectedProduct,
  onUpdateProduct,
  onCancel,
}) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");

  const resetForm = () => {
    setName("");
    setPrice("");
    setCategory("");
    setQuantity("");
  };

  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct.name ?? "");
      setPrice(String(selectedProduct.price ?? ""));
      setCategory(selectedProduct.category ?? "");
      setQuantity(String(selectedProduct.quantity ?? ""));
    } else {
      resetForm();
    }
  }, [selectedProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !category ||
      price.trim() === "" ||
      quantity.trim() === ""
    ) {
      alert("Please fill all fields!");
      return;
    }

    const numericPrice = Number(price);
    const numericQuantity = Number(quantity);

    if (
      !Number.isFinite(numericPrice) ||
      !Number.isFinite(numericQuantity) ||
      numericPrice <= 0 ||
      numericQuantity < 0 ||
      !Number.isInteger(numericQuantity)
    ) {
      alert("Enter a valid price and quantity!");
      return;
    }

    const productData = {
      name: name.trim(),
      price: numericPrice,
      category,
      quantity: numericQuantity,
    };

    if (selectedProduct) {
      onUpdateProduct({
        ...selectedProduct,
        ...productData,
      });
    } else {
      onAddProduct({
        id: Date.now(),
        ...productData,
      });
    }

    resetForm();
  };

  const handleCancel = () => {
    resetForm();

    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label>Product Name</label>
        <input
          type="text"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Price (₹)</label>
        <input
          type="number"
          min="0.01"
          step="0.01"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Furniture">Furniture</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label>Quantity</label>
        <input
          type="number"
          min="0"
          step="1"
          placeholder="Enter quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>

      <button type="submit" className="submit-button">
        {selectedProduct ? "Update Product" : "Add Product"}
      </button>

      {selectedProduct && (
        <button
          type="button"
          className="cancel-button"
          onClick={handleCancel}
        >
          Cancel Editing
        </button>
      )}
    </form>
  );
}

export default ProductForm;