// src/pages/Auth/SignUp.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { IoMailOutline, IoLockClosedOutline, IoPersonOutline, IoEyeOutline, IoEyeOffOutline, IoArrowBack } from 'react-icons/io5';
import './Auth.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      
      // Save the user's name to their Firebase profile
      if (userCredential.user) {
        await updateProfile(userCredential.user, { displayName: name });
      }

      navigate('/'); // Go home after success
    } catch (error) {
      alert(error.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      {/* Panning Background Image */}
      <img 
        className="auth-bg-image" 
        src="https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1080&auto=format&fit=crop" 
        alt="nature background" 
      />
      <div className="auth-overlay" />
      
      <div className="auth-card fade-in-up">
        <button className="auth-back-btn" onClick={() => navigate(-1)}>
          <IoArrowBack size={20} />
        </button>

        <div className="auth-header">
          <h1>Join Natureswad</h1>
          <p>Start your healthy journey today! 🌾</p>
        </div>

        <form onSubmit={handleSignUp}>
          <div className="auth-input-group">
            <label>Full Name</label>
            <div className="auth-input-box">
              <IoPersonOutline size={20} color="#2E7D32" style={{ marginRight: '12px' }} />
              <input 
                type="text" 
                placeholder="Your Full Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div className="auth-input-group">
            <label>Email Address</label>
            <div className="auth-input-box">
              <IoMailOutline size={20} color="#2E7D32" style={{ marginRight: '12px' }} />
              <input 
                type="email" 
                placeholder="hello@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div className="auth-input-group">
            <label>Password</label>
            <div className="auth-input-box">
              <IoLockClosedOutline size={20} color="#2E7D32" style={{ marginRight: '12px' }} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Create a strong password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <div onClick={() => setShowPassword(!showPassword)} style={{ cursor: 'pointer', display: 'flex' }}>
                {showPassword ? <IoEyeOffOutline color="#81C784" size={20} /> : <IoEyeOutline color="#81C784" size={20} />}
              </div>
            </div>
          </div>

          <button className="auth-primary-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <span className="auth-link" onClick={() => navigate('/login')}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;