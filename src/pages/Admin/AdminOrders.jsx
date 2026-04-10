// src/pages/Admin/AdminOrders.jsx
import React, { useState, useEffect } from 'react';
import HeaderTemp from '../../components/layout/HeaderTemp';

const API_URL = 'https://natureswad-backend.onrender.com/api';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAllOrders();
  }, []);

  const fetchAllOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/orders`);
      const data = await response.json();
      if (response.ok) {
        setOrders(data);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        // Update the list instantly on your screen
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order._id === orderId ? { ...order, status: newStatus } : order
          )
        );
      } else {
        alert("Failed to update status. Check backend connection.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    }
  };

  const statusOptions = ["Placed", "Packed", "Out for Delivery", "Delivered"];

  return (
    <div style={{ backgroundColor: '#F8F9FA', minHeight: '100vh', paddingBottom: '50px' }}>
      <HeaderTemp showBack={true} />
      
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#1A1A1A', margin: 0, fontSize: '32px' }}>Control Center</h1>
          <span style={{ background: '#1B5E20', color: '#FFF', padding: '8px 16px', borderRadius: '20px', fontWeight: 'bold' }}>
            {orders.length} Total Orders
          </span>
        </div>
        
        {loading ? (
          <p style={{ textAlign: 'center', fontWeight: 'bold', color: '#1B5E20' }}>Loading system...</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {orders.map(order => (
              <div key={order._id} style={{ background: '#FFF', padding: '24px', borderRadius: '20px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', border: '1px solid #F0F0F0' }}>
                
                {/* Header Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', borderBottom: '2px dashed #EEE', paddingBottom: '20px', marginBottom: '20px' }}>
                  <div>
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>Order #{order._id.slice(-8).toUpperCase()}</h3>
                    <p style={{ margin: '0 0 4px 0', color: '#666', fontSize: '14px' }}>{new Date(order.createdAt).toLocaleString('en-IN')}</p>
                    <div style={{ background: '#F1F8E9', padding: '10px 16px', borderRadius: '12px', marginTop: '12px', border: '1px solid #C8E6C9' }}>
                      <strong style={{ color: '#1B5E20' }}>Customer:</strong> {order.address?.name} <br/>
                      <strong style={{ color: '#1B5E20' }}>Phone:</strong> {order.address?.phone} <br/>
                      <strong style={{ color: '#1B5E20' }}>City:</strong> {order.address?.city} ({order.address?.pincode})
                    </div>
                  </div>

                  {/* The Dropdown Controller */}
                  <div style={{ minWidth: '200px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '800', color: '#888', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Update Tracker
                    </label>
                    <select 
                      value={order.status || 'Placed'}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '2px solid #1B5E20', fontWeight: '800', color: '#1B5E20', fontSize: '15px', cursor: 'pointer', backgroundColor: '#FFF', outline: 'none' }}
                    >
                      {statusOptions.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Items & Payment Summary */}
                <div style={{ fontSize: '15px', color: '#333' }}>
                  {order.items.map((i, index) => (
                    <div key={index} style={{ marginBottom: '8px', fontWeight: '600' }}>
                      • {i.name} <span style={{ color: '#888' }}>(Size: {i.weight || 'Standard'})</span> x {i.quantity}
                    </div>
                  ))}
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #EEE' }}>
                  <span style={{ color: '#666', fontWeight: 'bold' }}>{order.paymentMethod}</span>
                  <span style={{ fontSize: '22px', fontWeight: '900', color: '#1B5E20' }}>₹{order.total?.toFixed(2)}</span>
                </div>

              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}