import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Product({ id, name, description, price }) {
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [updatedData, setUpdatedData] = useState({
    name: name,
    description: description,
    price: price
  });

  const handleUpdate = () => {
    setShowUpdatePopup(true);
  };

  const handleDelete = () => {
    setShowDeletePopup(true);
  };

  const closeUpdatePopup = () => {
    setShowUpdatePopup(false);
  };

  const closeDeletePopup = () => {
    setShowDeletePopup(false);
  };

  // const saveUpdatedProduct = async () => {
  //   try {
  //     const response = await axios.put(`http://localhost:8080/api/products/put/${id}`, updatedData);
  //     const updatedProduct = response.data;
  //     setUpdatedData(updatedProduct);
  //     setShowUpdatePopup(false);
  //   } catch (error) {
  //     console.error('Error updating product:', error);
  //   }
  // };
  const saveUpdatedProduct = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/products/put/${id}`, updatedData);
      const updatedProduct = response.data;
      // Update the product list in the parent component
      //onUpdate(updatedProduct);
      setShowUpdatePopup(false);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  

  const confirmDeleteProduct = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/products/delete/${id}`);
      setShowDeletePopup(false);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{description}</td>
      <td>{price}</td>
      <td>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleDelete}>Delete</button>
        {showUpdatePopup && (
          <div className="update-popup">
            <h2>Update Product</h2>
            <input
              type="text"
              value={updatedData.name}
              onChange={(e) => setUpdatedData({ ...updatedData, name: e.target.value })}
              placeholder="Name"
            />
            <input
              type="text"
              value={updatedData.description}
              onChange={(e) => setUpdatedData({ ...updatedData, description: e.target.value })}
              placeholder="Description"
            />
            <input
              type="number"
              value={updatedData.price}
              onChange={(e) => setUpdatedData({ ...updatedData, price: e.target.value })}
              placeholder="Price"
            />
            <button onClick={saveUpdatedProduct}>Save</button>
            <button onClick={closeUpdatePopup}>Cancel</button>
          </div>
        )}
        {showDeletePopup && (
          <div className="delete-popup">
            <h2>Delete Product</h2>
            <p>Are you sure you want to delete this product?</p>
            <button onClick={confirmDeleteProduct}>Yes</button>
            <button onClick={closeDeletePopup}>No</button>
          </div>
        )}
      </td>
    </tr>
  );
}

// function YourComponentName() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     // Fetch products from backend API when the component mounts
//     getProducts();
//   }, []);

//   const getProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/products/get');
//       setProducts(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   return (
//     <div>
//       <h1>Products</h1>
//       <div className="user-table-container">
//         <table className="user-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Description</th>
//               <th>Price</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map(product => (
//               <Product
//                 key={product.id}
//                 id={product.id}
//                 name={product.name}
//                 description={product.description}
//                 price={product.price}
//               />
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

function YourComponentName() {
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    // Fetch products from backend API when the component mounts
    getProducts();
  }, []);
  
  const getProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/products/get');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
  const handleProductUpdate = (updatedProduct) => {
    setProducts(prevProducts => {
      return prevProducts.map(product => {
        if (product.id === updatedProduct.id) {
          return updatedProduct;
        }
        return product;
      });
    });
  };
  
  return (
    <div>
      <h1>Products</h1>
      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <Product
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              onUpdate={handleProductUpdate} // Pass the update function
              />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

 export default YourComponentName;