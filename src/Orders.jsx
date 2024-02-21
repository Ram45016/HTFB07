import React, { useState, useEffect } from 'react';
import './Orders.css'; // Assuming you have an Orders.css file for styling
import axios from 'axios';

function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from backend API when the component mounts
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/shipments/get');
      console.log('Orders response:', response.data);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  

  const updateOrder = async (order) => {
    try {
      // Implement your logic for updating order here
      // For example:
      // const response = await axios.put(`http://localhost:8080/shipments/put/${order.id}`, updatedData);
      // Handle the response accordingly
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      // Implement your logic for deleting order here
      // For example:
      // const response = await axios.delete(`http://localhost:8080/shipments/delete/${orderId}`);
      // Handle the response accordingly
      // After successful deletion, you may want to update the orders state to reflect the changes
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className="orders-container">
      <h1>Orders</h1>
      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Retailer ID</th>
              <th>Manufacturer ID</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Delivery Address</th>
              <th>Payment Method</th>
              <th>Price</th>
              <th>Order Status</th>
              {/* Additional attributes headers */}
              <th>Additional Attribute 1</th>
              <th>Additional Attribute 2</th>
              {/* Add more headers for additional attributes as needed */}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.retailerId}</td>
                <td>{order.manufacturerId}</td>
                <td>{order.productId}</td>
                <td>{order.quantity}</td>
                <td>{order.deliveryAddress}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.price}</td>
                <td>{order.orderStatus}</td>
                {/* Additional attributes */}
                <td>{order.additionalAttribute1}</td>
                <td>{order.additionalAttribute2}</td>
                {/* Add more cells for additional attributes as needed */}
                <td>
                  <button onClick={() => updateOrder(order)}>Update</button>
                  <button onClick={() => deleteOrder(order.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersPage;
