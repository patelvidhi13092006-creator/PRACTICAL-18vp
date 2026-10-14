
function ProductList({ products = [], onEditProduct }) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="6" className="empty-message">
                No products available.
              </td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>{product.name}</td>
                <td>
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
                <td>
                  <button
                    type="button"
                    className="edit-button"
                    onClick={() => onEditProduct(product)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;