import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { IoMailOutline, IoLockClosedOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate('/');
    } catch (error) {
      alert(error.message);
    } finally { setLoading(false); }
  };

  return (
    <div className="auth-page-container">
      <img className="auth-bg-image" src="https://images.unsplash.com/photo-1533038590840-1cbea6e15ea2?q=80&w=1080&auto=format&fit=crop" alt="nature" />
      <div className="auth-overlay" />
      
      <div className="auth-card fade-in-up">
        <div className="auth-header">
          <h1>Natureswad</h1>
          <p>Welcome Back, Nature Lover! 🌿</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="auth-input-group">
            <label>Email Address</label>
            <div className="auth-input-box">
              <IoMailOutline size={20} color="#2E7D32" style={{marginRight: '12px'}} />
              <input type="email" placeholder="hello@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            </div>
          </div>

          <div className="auth-input-group">
            <label>Password</label>
            <div className="auth-input-box">
              <IoLockClosedOutline size={20} color="#2E7D32" style={{marginRight: '12px'}} />
              <input type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={(e)=>setPassword(e.target.value)} required />
              <div onClick={() => setShowPassword(!showPassword)} style={{cursor:'pointer'}}>
                {showPassword ? <IoEyeOffOutline color="#81C784" /> : <IoEyeOutline color="#81C784" />}
              </div>
            </div>
          </div>

          <button className="auth-primary-btn" disabled={loading}>
            {loading ? "Authenticating..." : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <span className="auth-link" onClick={() => navigate('/signup')}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}