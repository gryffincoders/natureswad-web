// src/pages/Rewards/Rewards.jsx
import React, { useState, useEffect } from 'react';
import { IoStar, IoCartOutline, IoSparklesOutline, IoGiftOutline, IoReceiptOutline, IoSearchCircle } from 'react-icons/io5';
import HeaderTemp from '../../components/layout/HeaderTemp';
import { auth } from '../../config/firebase';
import './Rewards.css';

const API_URL = 'https://natureswad-backend.onrender.com/api';
const POINTS_REQUIRED = 200;
const DISCOUNT_VALUE = 200;

export default function Rewards() {
  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState(0);
  const [history, setHistory] = useState([]);
  
  // Guest Lookup State
  const [guestPhoneInput, setGuestPhoneInput] = useState('');
  const [identifier, setIdentifier] = useState(auth?.currentUser?.uid || null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (identifier) {
      fetchRewardsData(identifier);
    }
  }, [identifier]);

  const fetchRewardsData = async (uid) => {
    setLoading(true);
    try {
      const pointsRes = await fetch(`${API_URL}/user-points/${uid}`);
      if (pointsRes.ok) {
        const pointsData = await pointsRes.json();
        setPoints(pointsData.points || 0);
      }

      const ordersRes = await fetch(`${API_URL}/orders/${uid}`);
      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        const pointsHistory = ordersData.filter(order => 
          (order.pointsEarned && order.pointsEarned > 0) || 
          (order.pointsRedeemed && order.pointsRedeemed > 0)
        );
        setHistory(pointsHistory);
      }
    } catch (error) {
      console.error("Error fetching rewards:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestSearch = () => {
    const cleanPhone = guestPhoneInput.replace(/\D/g, '');
    if (cleanPhone.length === 10) {
      setIdentifier(cleanPhone);
    } else {
      alert("Please enter a valid 10-digit mobile number.");
    }
  };

  // 1. IF NO IDENTIFIER: SHOW PHONE INPUT SCREEN
  if (!identifier) {
    return (
      <div className="rewards-main-container">
        <HeaderTemp showBack={true} />
        <div className="rewards-guest fade-in-up">
          <div className="guest-icon-circle"><IoStar size={48} color="#F57F17" /></div>
          <h2>Check Your Rewards</h2>
          <p>Enter the mobile number used during your previous checkouts to view your points and history.</p>
          
          <div className="guest-search-box">
            <input 
              type="tel" 
              maxLength="10" 
              placeholder="10-digit Mobile Number" 
              value={guestPhoneInput}
              onChange={(e) => setGuestPhoneInput(e.target.value)}
            />
            <button onClick={handleGuestSearch}>
              View Balance <IoSearchCircle size={24} style={{marginLeft: '4px'}}/>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. SHOW DASHBOARD
  const progressPercentage = Math.min((points / POINTS_REQUIRED) * 100, 100);

  return (
    <div className="rewards-main-container">
      <div className="bg-blob blob1"></div>
      <div className="bg-blob blob2"></div>
      <HeaderTemp showBack={true} />

      <main className="rewards-content-wrapper fade-in-up">
        
        {/* HERO CARD */}
        <div className="rewards-hero-card">
          <div className="rewards-hero-top">
            <div>
              <h1 className="rewards-hero-title">Natureswad Rewards</h1>
              <p className="rewards-hero-sub">
                {auth?.currentUser ? "Your total available balance" : `Guest Account: ${identifier}`}
                {!auth?.currentUser && (
                   <span className="logout-text" onClick={() => setIdentifier(null)}> (Change)</span>
                )}
              </p>
            </div>
            <div className="rewards-icon-circle"><IoStar size={32} color="#F57F17" /></div>
          </div>
          
          <div className="rewards-points-display">
            <span className="rewards-big-number">{loading ? "..." : points}</span>
            <span className="rewards-label">Points</span>
          </div>

          <div className="rewards-progress-container">
            <div className="progress-header">
              <span>Next Reward: ₹{DISCOUNT_VALUE} Off</span>
              <span>{points} / {POINTS_REQUIRED}</span>
            </div>
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${progressPercentage}%` }}></div>
            </div>
            {points >= POINTS_REQUIRED ? (
              <p className="reward-ready-text">🎉 Reward Unlocked! Apply at checkout.</p>
            ) : (
              <p className="points-needed-text">Earn {POINTS_REQUIRED - points} more points to unlock!</p>
            )}
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="rewards-info-grid fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="info-box"><IoCartOutline size={32} color="#1B5E20" /><h3>Shop</h3><p>Buy your favorite organic foods.</p></div>
          <div className="info-box"><IoSparklesOutline size={32} color="#F57F17" /><h3>Earn</h3><p>Get 25 points on every delivery.</p></div>
          <div className="info-box"><IoGiftOutline size={32} color="#D84315" /><h3>Redeem</h3><p>Save ₹200 for every 200 points.</p></div>
        </div>

        {/* POINTS HISTORY */}
        <div className="rewards-history-section fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="history-title">Points History</h2>
          
          {loading ? (
             <div className="empty-history"><p>Loading history...</p></div>
          ) : history.length === 0 ? (
            <div className="empty-history">
              <IoReceiptOutline size={48} color="#E0E0E0" />
              <p>No rewards history yet. Make a purchase to earn points!</p>
            </div>
          ) : (
            <div className="history-list-card">
              {history.map((order, index) => (
                <div key={order._id} className={`history-row ${index === history.length - 1 ? 'last' : ''}`}>
                  <div className="history-left">
                    <div className="history-icon-bg"><IoCartOutline size={20} color="#555" /></div>
                    <div>
                      <h4>Order #{order._id.substring(order._id.length - 6).toUpperCase()}</h4>
                      <span>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </div>
                  </div>
                  <div className="history-right">
                    {order.pointsEarned > 0 && <span className="earned-badge">+{order.pointsEarned} Earned</span>}
                    {order.pointsRedeemed > 0 && <span className="redeemed-badge">-{order.pointsRedeemed} Redeemed</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}