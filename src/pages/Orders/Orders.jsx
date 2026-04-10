import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoSearchCircle, IoReceiptOutline, IoTime, IoCheckmarkCircle, IoRefresh, IoLeaf } from 'react-icons/io5';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebase';
import HeaderTemp from '../../components/layout/HeaderTemp';
import './Orders.css';

const API_URL = 'https://natureswad-backend.onrender.com/api';

export default function Orders() {
  const navigate = useNavigate();
  const location = useLocation();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [guestPhone, setGuestPhone] = useState('');
  const [hasSearchedGuest, setHasSearchedGuest] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsGuest(false);
        fetchOrders(user.uid);
      } else {
        setIsGuest(true);
        const phone = location.state?.guestPhone;
        if (phone) {
          setGuestPhone(phone);
          fetchOrders(phone);
        } else {
          setLoading(false);
        }
      }
    });
    return () => unsubscribe();
  }, [location]);

  const fetchOrders = async (id) => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/orders/${id}`);
      const data = await res.json();
      if (res.ok) {
        setOrders(Array.isArray(data) ? data.reverse() : []);
      } else {
        setOrders([]);
      }
    } catch (err) {
      setOrders([]);
    } finally {
      setLoading(false);
      setHasSearchedGuest(true);
    }
  };

  const handleGuestSearch = (e) => {
    e.preventDefault();
    const clean = guestPhone.replace(/\D/g, '');
    if (clean.length === 10) fetchOrders(clean);
    else alert("Please enter a valid 10-digit number.");
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Just now';
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const getStatusIndex = (status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('delivered')) return 3;
    if (s.includes('out for delivery')) return 2;
    if (s.includes('packed')) return 1;
    return 0;
  };

  const trackingSteps = ["Placed", "Packed", "On Way", "Delivered"];

  return (
    <div className="orders-main-container">
      <div className="bg-blob blob1"></div>
      <div className="bg-blob blob2"></div>

      <HeaderTemp />

      <main className="orders-content-wrapper">
        
        {loading && !hasSearchedGuest && (
          <div className="orders-loading-state fade-in-up">
            <div className="spinner"></div>
            <p>Syncing your orders...</p>
          </div>
        )}

        {isGuest && !hasSearchedGuest && !loading && (
          <div className="guest-tracking-card shadow-premium fade-in-up">
            <div className="guest-icon-wrapper">
              <IoSearchCircle size={60} color="#2E7D32" />
            </div>
            <h2>Track Your Order</h2>
            <p>Enter the phone number used at checkout to view your order history.</p>
            <form onSubmit={handleGuestSearch} className="guest-tracking-form">
              <div className="input-group">
                <input 
                  type="tel" 
                  maxLength="10"
                  placeholder="10-digit mobile number" 
                  value={guestPhone} 
                  onChange={(e) => setGuestPhone(e.target.value.replace(/\D/g, ''))}
                  required
                />
              </div>
              <button type="submit" className="track-order-btn interactive-hover">
                Find Orders
              </button>
            </form>
          </div>
        )}

        {((!isGuest && !loading) || (isGuest && hasSearchedGuest && !loading)) && (
          <div className="orders-list-section">
            <div className="orders-header-row fade-in-up">
              <h1 className="page-title">Past Orders</h1>
              <span className="order-count-text">{orders.length} Items Found</span>
            </div>

            {orders.length === 0 ? (
              <div className="orders-empty-state fade-in-up">
                <div className="empty-icon-wrapper">
                  <IoReceiptOutline size={64} color="#C8E6C9" />
                </div>
                <h2>No Orders Yet</h2>
                <button className="start-shopping-btn interactive-hover" onClick={() => navigate('/shop')}>
                  Browse Store
                </button>
              </div>
            ) : (
              <div className="food-orders-list">
                {orders.map((order, index) => {
                  const currentIndex = getStatusIndex(order.status);
                  const isDelivered = currentIndex === 3;

                  return (
                    <div key={order._id} className="food-order-card shadow-premium fade-in-up" style={{ animationDelay: `${0.05 * index}s` }}>
                      
                      <div className="food-card-header">
                        <div className="store-info-row">
                          <div className="store-logo-box">
                            
                          </div>
                          <div className="store-meta">
                            <h3 className="store-name">Natureswad Official</h3>
                            <span className="store-location">Order ID: #{order._id.slice(-6).toUpperCase()}</span>
                          </div>
                        </div>
                        <div className={`food-status-badge ${isDelivered ? 'status-success' : 'status-pending'}`}>
                          <span>{order.status || 'Placed'}</span>
                          {isDelivered ? <IoCheckmarkCircle size={14} /> : <IoTime size={14} />}
                        </div>
                      </div>

                      <div className="dashed-divider"></div>

                      {/* --- 🔥 HORIZONTAL TRACKER --- */}
                      <div className="order-tracker-wrapper">
                        <div className="order-tracker">
                          {trackingSteps.map((step, i) => (
                            <div key={i} className={`tracker-step ${i <= currentIndex ? "active" : ""}`}>
                              <div className="circle"></div>
                              <span className="step-label">{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {isDelivered && (
                        <div className="delivered-confirmation fade-in-up">
                          <IoCheckmarkCircle size={24} color="#2E7D32" />
                          <div className="success-text">
                            <strong>Delivered Successfully</strong>
                            <span>Enjoy your meal!</span>
                          </div>
                        </div>
                      )}

                      <div className="dashed-divider"></div>

                      <div className="food-items-summary">
                        {order.items?.map((item, i) => (
                          <div key={i} className="food-item-row">
                            <div className="food-item-left">
                              <IoLeaf size={14} color="#A5D6A7" />
                              <span className="food-item-name">{item.name}</span>
                            </div>
                            <span className="food-item-qty">x {item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="food-order-meta">
                        <span className="food-order-date">{formatDate(order.createdAt)}</span>
                        <span className="food-order-total">Total: ₹{order.total?.toFixed(2)}</span>
                      </div>

                      <div className="dashed-divider"></div>

                      <div className="food-card-actions">
                        <button className="rate-btn interactive-hover" onClick={() => navigate('/contact')}>Need Help?</button>
                        <button className="reorder-swiggy-btn interactive-hover" onClick={() => navigate('/shop')}>
                          <IoRefresh size={16} /> REORDER
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}