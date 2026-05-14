// src/pages/Checkout/Checkout.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoLocationOutline, IoWalletOutline, IoCardOutline, IoCashOutline, IoShieldCheckmark, IoSparkles, IoCheckmarkCircle } from 'react-icons/io5';
import HeaderTemp from '../../components/layout/HeaderTemp';
import { useCart } from '../../context/CartContext';
import { auth } from '../../config/firebase'; 
import './Checkout.css';

const API_URL = 'https://natureswad-backend.onrender.com/api';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('online');

  // --- REWARDS STATE ---
  const [userPoints, setUserPoints] = useState(0);
  const [usePoints, setUsePoints] = useState(false);
  const POINTS_REQUIRED_TO_REDEEM = 200;
  const DISCOUNT_VALUE = 200; 
  const POINTS_EARNED_PER_ORDER = 25;

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [pincode, setPincode] = useState('');

  const cleanPhone = phone.replace(/\D/g, '');

  const isAddressValid =
    name.trim().length > 0 &&
    cleanPhone.length === 10 &&
    address.trim().length > 0 &&
    city.trim().length > 0 &&
    stateName.trim().length > 0 &&
    pincode.trim().length === 6;

  // --- LOAD SAVED ADDRESS ON MOUNT ---
  useEffect(() => {
    try {
      const savedAddressString = localStorage.getItem('@saved_address');
      if (savedAddressString) {
        const savedData = JSON.parse(savedAddressString);
        if (savedData.name) setName(savedData.name);
        if (savedData.phone) setPhone(savedData.phone);
        if (savedData.address) setAddress(savedData.address);
        if (savedData.city) setCity(savedData.city);
        if (savedData.stateName) setStateName(savedData.stateName);
        if (savedData.pincode) setPincode(savedData.pincode);
      }
    } catch (error) {
      console.log("Could not load saved address", error);
    }
  }, []);

  // --- AUTO-FILL STATE & CITY FROM PINCODE ---
  useEffect(() => {
    const fetchLocationData = async () => {
      // Only trigger if pincode is exactly 6 digits
      if (pincode.length === 6) {
        try {
          const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
          const data = await response.json();
          
          if (data && data[0] && data[0].Status === "Success") {
            const postOffice = data[0].PostOffice[0];
            
            // Set State automatically
            if (postOffice.State) {
              setStateName(postOffice.State);
            }
            
            // Set City/District automatically if the user hasn't typed anything yet
            if (!city && (postOffice.District || postOffice.Block)) {
              setCity(postOffice.District || postOffice.Block);
            }
          }
        } catch (error) {
          console.log("Could not fetch pincode details", error);
        }
      }
    };

    fetchLocationData();
  }, [pincode]); // Runs whenever pincode changes

  // --- FETCH USER POINTS ---
  useEffect(() => {
    const fetchUserPoints = async () => {
      const uid = auth?.currentUser?.uid || (cleanPhone.length === 10 ? cleanPhone : null);
      if (!uid) {
        setUserPoints(0);
        setUsePoints(false); 
        return;
      }
      try {
        const response = await fetch(`${API_URL}/user-points/${uid}`);
        if (response.ok) {
          const data = await response.json();
          setUserPoints(data.points || 0);
        }
      } catch (error) {
        console.log("Could not fetch points", error);
      }
    };
    fetchUserPoints();
  }, [auth?.currentUser, cleanPhone]);

  // --- CALCULATIONS ---
  const subtotal = Number(cartTotal) || 0;
  const shipping = subtotal >= 500 ? 0 : 40;
  const tax = subtotal * 0.05;
  const pointsDiscount = usePoints ? DISCOUNT_VALUE : 0;
  const total = Math.max(0, subtotal + shipping + tax - pointsDiscount);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (cartItems.length === 0 && !isProcessing) navigate('/shop');
  }, [cartItems, navigate, isProcessing]);

  const getOrderDetails = () => ({
    userId: auth?.currentUser?.uid || cleanPhone, 
    subtotal: subtotal,
    discountApplied: pointsDiscount,
    pointsRedeemed: usePoints ? POINTS_REQUIRED_TO_REDEEM : 0,
    pointsEarned: POINTS_EARNED_PER_ORDER,
    total: total,
    items: cartItems,
    address: { name, phone: cleanPhone, address, city, stateName, pincode },
    paymentMethod: paymentMethod === 'online' ? 'Online - Razorpay' : 'Cash on Delivery'
  });

  // --- SAVE ADDRESS HELPER ---
  const saveAddressLocally = () => {
    try {
      const addressData = { name, phone: cleanPhone, address, city, stateName, pincode };
      localStorage.setItem('@saved_address', JSON.stringify(addressData));
    } catch (error) {
      console.log("Could not save address locally", error);
    }
  };

  const handleCheckout = async () => {
    if (!isAddressValid) {
      alert('Please fill all delivery details correctly (10-digit phone, 6-digit pincode).');
      return;
    }
    if (paymentMethod === 'online') startRazorpayPayment();
    else processCODOrder();
  };

  const startRazorpayPayment = async () => {
    setIsProcessing(true);
    const res = await loadRazorpayScript();
    if (!res) { alert('Razorpay failed to load'); setIsProcessing(false); return; }

    try {
      const response = await fetch(`${API_URL}/create-razorpay-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: Math.round(total * 100).toString(),
        currency: 'INR',
        name: 'Natureswad',
        description: 'Purchase',
        order_id: data.orderId,
        prefill: { name, contact: cleanPhone },
        theme: { color: '#1B5E20' },
        handler: async (paymentData) => {
          try {
            const verifyRes = await fetch(`${API_URL}/verify-and-save-order`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ ...paymentData, orderDetails: getOrderDetails() })
            });
            if (!verifyRes.ok) throw new Error("Payment verification failed");

            saveAddressLocally(); // <-- Save address on success
            clearCart();
            alert(`Payment successful! You earned ${POINTS_EARNED_PER_ORDER} points.`);
            navigate('/orders', { state: { guestPhone: cleanPhone }, replace: true });
          } catch (err) { alert(err.message); setIsProcessing(false); }
        },
        modal: { ondismiss: () => setIsProcessing(false) }
      };
      new window.Razorpay(options).open();
    } catch (err) { alert(err.message); setIsProcessing(false); }
  };

  const processCODOrder = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch(`${API_URL}/place-cod-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderDetails: getOrderDetails() })
      });
      if (!response.ok) throw new Error("COD Order Failed");

      saveAddressLocally(); // <-- Save address on success
      clearCart();
      alert(`COD Order Placed! You earned ${POINTS_EARNED_PER_ORDER} points.`);
      navigate('/orders', { state: { guestPhone: cleanPhone }, replace: true });
    } catch (err) { alert('Order failed'); setIsProcessing(false); }
  };

  if (cartItems.length === 0 && !isProcessing) return null;

  return (
    <div className="checkout-main-container">
      <div className="bg-blob blob1"></div>
      <div className="bg-blob blob2"></div>
      <HeaderTemp showBack={true} />

      <main className="checkout-content-wrapper fade-in-up">
        <h1 className="checkout-page-title">Secure Checkout</h1>
        <div className="checkout-grid-layout">
          <div className="checkout-form-column">
            
            {/* DELIVERY SECTION */}
            <div className="checkout-section-card shadow-premium">
              <div className="section-header">
                <IoLocationOutline size={24} color="#1B5E20" />
                <h2 className="section-title">Delivery Details</h2>
              </div>
              <div className="form-grid">
                <div className="input-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Enter your full name" value={name} onChange={e => setName(e.target.value)} disabled={isProcessing} />
                </div>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input type="tel" maxLength="10" placeholder="Mobile no" value={phone} onChange={e => setPhone(e.target.value)} disabled={isProcessing} />
                </div>
                <div className="input-group full-width">
                  <label>Complete Address</label>
                  <textarea rows="3" placeholder="House No, Street, Area" value={address} onChange={e => setAddress(e.target.value)} disabled={isProcessing} />
                </div>
                <div className="input-group">
                  <label>Pincode</label>
                  {/* Moved Pincode before City/State for better flow since it auto-fills them */}
                  <input type="tel" maxLength="6" placeholder="Pincode" value={pincode} onChange={e => setPincode(e.target.value)} disabled={isProcessing} />
                </div>
                <div className="input-group">
                  <label>City</label>
                  <input type="text" placeholder="City" value={city} onChange={e => setCity(e.target.value)} disabled={isProcessing} />
                </div>
                <div className="input-group full-width">
                  <label>State</label>
                  <input type="text" placeholder="State Name" value={stateName} onChange={e => setStateName(e.target.value)} disabled={isProcessing} />
                </div>
              </div>
            </div>

            {/* REWARDS SECTION */}
            {(auth?.currentUser || cleanPhone.length === 10) && (
              <div className="checkout-section-card shadow-premium fade-in-up">
                <div className="section-header">
                  <IoSparkles size={24} color="#F57F17" />
                  <h2 className="section-title">Natureswad Rewards</h2>
                </div>
                <p className="points-balance-text">
                  Current Balance: <strong>{userPoints}</strong> Points
                </p>

                {userPoints >= POINTS_REQUIRED_TO_REDEEM ? (
                  <button 
                    className={`redeem-btn ${usePoints ? 'active' : ''}`}
                    onClick={() => !isProcessing && setUsePoints(!usePoints)}
                    disabled={isProcessing}
                  >
                    <span>{usePoints ? `Redeeming ${POINTS_REQUIRED_TO_REDEEM} Points (-₹${DISCOUNT_VALUE})` : `Redeem ${POINTS_REQUIRED_TO_REDEEM} Points`}</span>
                    <IoCheckmarkCircle size={20} color={usePoints ? '#1B5E20' : '#F57F17'} />
                  </button>
                ) : (
                  <div className="points-progress-container">
                    <div className="progress-bar-bg">
                      <div className="progress-bar-fill" style={{ width: `${(userPoints / POINTS_REQUIRED_TO_REDEEM) * 100}%` }}></div>
                    </div>
                    <p className="points-hint">Earn {POINTS_REQUIRED_TO_REDEEM - userPoints} more points to unlock a ₹{DISCOUNT_VALUE} reward!</p>
                  </div>
                )}
              </div>
            )}

            {/* PAYMENT SECTION */}
            <div className="checkout-section-card shadow-premium">
              <div className="section-header">
                <IoWalletOutline size={24} color="#1B5E20" />
                <h2 className="section-title">Payment Method</h2>
              </div>
              <div className={`pay-option-card ${paymentMethod === 'online' ? 'selected' : ''}`} onClick={() => !isProcessing && setPaymentMethod('online')}>
                <div className="pay-icon-bg"><IoCardOutline size={24} color={paymentMethod === 'online' ? '#FFF' : '#666'} /></div>
                <div className="pay-option-text"><h4>Pay Online</h4><p>UPI, Credit/Debit Cards, NetBanking</p></div>
                <div className={`radio-circle ${paymentMethod === 'online' ? 'active' : ''}`}></div>
              </div>
              <div className={`pay-option-card ${paymentMethod === 'cod' ? 'selected' : ''}`} onClick={() => !isProcessing && setPaymentMethod('cod')}>
                <div className="pay-icon-bg"><IoCashOutline size={24} color={paymentMethod === 'cod' ? '#FFF' : '#666'} /></div>
                <div className="pay-option-text"><h4>Cash on Delivery</h4><p>Pay at your doorstep</p></div>
                <div className={`radio-circle ${paymentMethod === 'cod' ? 'active' : ''}`}></div>
              </div>
            </div>
          </div>

          <div className="checkout-summary-column">
            <div className="checkout-summary-card shadow-premium">
              <h3 className="summary-title">Bill Summary</h3>
              <div className="summary-row"><span className="summary-label">Item Total</span><span className="summary-value">₹{subtotal.toFixed(2)}</span></div>
              <div className="summary-row"><span className="summary-label">Delivery Fee</span><span className={shipping === 0 ? "free-text" : "summary-value"}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
              <div className="summary-row"><span className="summary-label">Taxes (5%)</span><span className="summary-value">₹{tax.toFixed(2)}</span></div>
              {usePoints && (
                <div className="summary-row discount-row"><span className="summary-label">Points Discount</span><span className="summary-value">-₹{pointsDiscount.toFixed(2)}</span></div>
              )}
              <div className="summary-divider"></div>
              <div className="summary-row total-row"><span className="total-label">Amount to Pay</span><span className="total-value">₹{total.toFixed(2)}</span></div>

              <button className={`checkout-action-btn ${isProcessing ? 'processing' : ''}`} onClick={handleCheckout} disabled={isProcessing}>
                {isProcessing ? <span className="spinner-text">Processing...</span> : <><span className="checkout-action-text">{paymentMethod === 'online' ? `Pay ₹${total.toFixed(2)}` : `Place COD Order`}</span><IoShieldCheckmark size={20} color="#FFF" style={{ marginLeft: '8px' }} /></>}
              </button>
              
              <div className="earn-points-banner"><IoSparkles size={16} /><span>You will earn <strong>{POINTS_EARNED_PER_ORDER} points</strong> on this order!</span></div>
              <p className="secure-checkout-note"><IoShieldCheckmark size={14} /> 100% Secure Payments</p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}