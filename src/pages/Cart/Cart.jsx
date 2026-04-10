// src/pages/Cart/Cart.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoTrashOutline, IoAdd, IoRemove, IoTicketOutline, IoChevronForward, IoCart, IoArrowForward, IoLeaf } from 'react-icons/io5';
import HeaderTemp from '../../components/layout/HeaderTemp';
import { useCart } from '../../context/CartContext';
import { PRODUCTS } from '../../constants/ProductsData';
import './Cart.css';

const cleanText = (text) => text ? text.replace(/\//g, '') : '';

export default function Cart() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, cartTotal, addToCart } = useCart();
  
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);

  const discount = appliedPromo === 'NATURE10' ? cartTotal * 0.1 : 0;
  const finalTotal = cartTotal - discount;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'NATURE10') {
      setAppliedPromo('NATURE10');
      alert('10% Discount Applied!');
    } else if (promoCode) {
      alert('Invalid Promo Code');
    }
    setShowPromoInput(false);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    navigate('/checkout'); // Update this when you build the checkout page!
    alert("Proceeding to checkout...");
  };

  const renderEmptyState = () => (
    <div className="cart-empty-state fade-in-up">
      <div className="empty-icon-wrapper">
        <IoCart size={80} color="#2E7D32" />
      </div>
      <h2 className="empty-title">Your bag is empty</h2>
      <p className="empty-subtitle">Looks like you haven't added any premium health products to your bag yet.</p>
      <button className="shop-button interactive-hover" onClick={() => navigate('/shop')}>
        Browse Products
      </button>
    </div>
  );

  return (
    <div className="cart-main-container">
      <div className="bg-blob blob1"></div>
      <div className="bg-blob blob2"></div>

      <HeaderTemp showBack={true} title="Shopping Bag" />

      <main className="cart-content-wrapper">
        {cartItems.length === 0 ? (
          renderEmptyState()
        ) : (
          <div className="cart-grid-layout">
            
            {/* LEFT COLUMN: Cart Items */}
            <div className="cart-items-column fade-in-up">
              <div className="cart-header-row">
                <h1 className="cart-page-title">Your Bag</h1>
                <span className="cart-item-count">{cartItems.length} Items</span>
              </div>

              <div className="cart-items-list">
                {cartItems.map((item, index) => (
                  <div key={`${item.id}-${item.weight}-${index}`} className="cart-item-card">
                    <div className="item-image-wrapper interactive-hover" onClick={() => navigate(`/product/${item.id}`)}>
                      <img src={item.image} alt={item.name} className="item-image" />
                    </div>
                    
                    <div className="item-details">
                      <div className="item-header">
                        <div className="item-name-box">
                          <h3 className="item-name line-clamp-2" onClick={() => navigate(`/product/${item.id}`)}>{cleanText(item.name)}</h3>
                          <span className="item-weight">{item.weight}</span>
                        </div>
                        <button className="delete-btn interactive-hover" onClick={() => removeFromCart(item.id, item.weight)}>
                          <IoTrashOutline size={20} color="#E53935" />
                        </button>
                      </div>

                      <div className="item-footer">
                        <span className="item-price">{item.price}</span>
                        
                        <div className="qty-control">
                          <button 
                            className="qty-btn" 
                            onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.weight, item.quantity - 1) : removeFromCart(item.id, item.weight)}
                          >
                            <IoRemove size={16} color={item.quantity === 1 ? "#999" : "#1B5E20"} />
                          </button>
                          <span className="qty-text">{item.quantity}</span>
                          <button 
                            className="qty-btn" 
                            onClick={() => updateQuantity(item.id, item.weight, item.quantity + 1)}
                          >
                            <IoAdd size={16} color="#1B5E20" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT COLUMN: Sticky Order Summary */}
            <div className="cart-summary-column fade-in-up" style={{ animationDelay: '0.1s' }}>
              
              {/* Promo Code Section */}
              <div className="promo-section">
                {showPromoInput ? (
                  <div className="promo-input-container">
                    <input
                      type="text"
                      className="promo-input"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      autoCapitalize="characters"
                    />
                    <button className="apply-btn interactive-hover" onClick={handleApplyPromo}>Apply</button>
                  </div>
                ) : (
                  <button className="promo-toggle-btn interactive-hover" onClick={() => setShowPromoInput(true)}>
                    <div className="promo-left">
                      <div className="promo-icon-bg"><IoTicketOutline size={18} color="#2E7D32" /></div>
                      <span className="promo-btn-text">
                        {appliedPromo ? `Code Applied: ${appliedPromo}` : 'Apply Promo Code'}
                      </span>
                    </div>
                    {!appliedPromo && <IoChevronForward size={18} color="#888" />}
                  </button>
                )}
              </div>

              {/* Bill Details */}
              <div className="summary-card">
                <h3 className="summary-title">Bill Details</h3>
                
                <div className="summary-row">
                  <span className="summary-label">Item Total</span>
                  <span className="summary-value">₹{cartTotal.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="summary-row discount-row">
                    <span className="summary-label">Discount (10%)</span>
                    <span className="summary-value">-₹{discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="summary-row">
                  <span className="summary-label">Delivery Fee</span>
                  <span className="summary-value free-text">FREE</span>
                </div>
                
                <div className="summary-divider"></div>
                
                <div className="summary-row total-row">
                  <span className="total-label">To Pay</span>
                  <span className="total-value">₹{finalTotal.toFixed(2)}</span>
                </div>

                <button className="checkout-btn interactive-hover" onClick={handleCheckout}>
                  <span className="checkout-btn-text">Proceed to Pay</span>
                  <IoArrowForward size={20} color="#FFF" />
                </button>
              </div>

            </div>

          </div>
        )}
      </main>
    </div>
  );
}