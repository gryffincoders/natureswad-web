// src/components/layout/ShoppingBag.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoClose, IoTrashOutline, IoAdd, IoRemove, IoCartOutline, IoArrowForward } from 'react-icons/io5';
import { useCart } from '../../context/CartContext';
import './ShoppingBag.css';
import { cleanText } from '../../utils/textUtils';

export default function ShoppingBag() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, cartTotal, isCartOpen, closeCart } = useCart();

  // Navigates to the Checkout page
  const handleCheckout = () => {
    closeCart();
    navigate('/checkout'); 
  };

  // Navigates to the Shop page when the bag is empty
  const handleStartShopping = () => {
    closeCart();
    navigate('/shop');
  };

  return (
    <>
      {/* Background Overlay */}
      <div className={`cart-overlay ${isCartOpen ? 'active' : ''}`} onClick={closeCart} />

      {/* Sliding Panel */}
      <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="cart-drawer-header">
          <div className="cart-header-left">
            <IoCartOutline size={24} color="#1B5E20" />
            <h3>Your Bag ({cartItems.length})</h3>
          </div>
          <button className="cart-close-btn interactive-hover" onClick={closeCart}>
            <IoClose size={28} color="#333" />
          </button>
        </div>

        <div className="cart-drawer-content">
          {cartItems.length === 0 ? (
            <div className="cart-empty-state">
              <IoCartOutline size={64} color="#E8F5E9" />
              <p>Your bag is currently empty.</p>
              {/* UPDATED: Now takes the user directly to the shop! */}
              <button className="start-shopping-btn interactive-hover" onClick={handleStartShopping}>
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${item.weight}-${index}`} className="cart-drawer-item">
                  <img src={item.image} alt={item.name} className="cart-item-thumb" />
                  <div className="cart-item-info">
                    <h4 className="line-clamp-2">{cleanText(item.name)}</h4>
                    <span className="cart-item-weight">{item.weight}</span>
                    <div className="cart-item-controls">
                      <div className="cart-qty-box">
                        <button onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.weight, item.quantity - 1) : removeFromCart(item.id, item.weight)}>
                          <IoRemove size={14} color="#1B5E20" />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.weight, item.quantity + 1)}>
                          <IoAdd size={14} color="#1B5E20" />
                        </button>
                      </div>
                      <span className="cart-item-price">{item.price}</span>
                    </div>
                  </div>
                  <button className="cart-item-remove interactive-hover" onClick={() => removeFromCart(item.id, item.weight)}>
                    <IoTrashOutline size={18} color="#FF5252" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-total-row">
              <span>Total Amount</span>
              <span className="total-price">₹{cartTotal.toFixed(2)}</span>
            </div>
            <p className="cart-footer-note">Shipping & taxes calculated at checkout</p>
            {/* The Checkout routing is perfectly attached here */}
            <button className="cart-checkout-btn interactive-hover" onClick={handleCheckout}>
              Proceed to Pay <IoArrowForward style={{ marginLeft: '10px' }} />
            </button>
          </div>
        )}
      </div>
    </>
  );
}