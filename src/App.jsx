import { useState } from "react";
import ProductForm from "./components/ProductFrom.jsx";
import ProductList from "./components/ProductList.jsx";
import "./index.css";

function App() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Laptop",
      price: 50000,
      category: "Electronics",
      quantity: 10,
    },
    {
      id: 2,
      name: "T-Shirt",
      price: 800,
      category: "Clothing",
      quantity: 25,
    },
    {
      id: 3,
      name: "React Book",
      price: 600,
      category: "Books",
      quantity: 15,
    },
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddProduct = (newProduct) => {
    setProducts((previousProducts) => [
      ...previousProducts,
      newProduct,
    ]);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts((previousProducts) =>
      previousProducts.map((product) =>
        product.id === updatedProduct.id
          ? updatedProduct
          : product
      )
    );

    setSelectedProduct(null);
    alert("Product updated successfully!");
  };

  const handleCancel = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Product Management System</h1>
        <p>Add, edit and manage your products</p>
      </header>

      <main className="container">
        <section className="card">
          <h2>
            {selectedProduct ? "Update Product" : "Add New Product"}
          </h2>

          <p className="description">
            {selectedProduct
              ? "Edit the selected product details."
              : "Enter product details below."}
          </p>

          <ProductForm
            onAddProduct={handleAddProduct}
            selectedProduct={selectedProduct}
            onUpdateProduct={handleUpdateProduct}
            onCancel={handleCancel}
          />
        </section>

        <section className="card">
          <h2>Product List</h2>
          <p className="description">
            Total Products: {products.length}
          </p>

          <ProductList
            products={products}
            onEditProduct={handleEditProduct}
          />
        </section>
      </main>

      <footer>
        Product Management System | Update Operation
      </footer>
    </div>
  );
}

export default App;