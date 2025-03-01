import React, { useState, useEffect } from 'react';
import { ShieldCheck, Brain, Layers, Code, Download, KeyRound } from 'lucide-react';
import './Welcome.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

const WelcomePage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Clear message after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Handle form submission feedback
  const showMessage = (text, type) => {
    setMessage({ text, type });
  };

  // Send OTP to Email
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/send-otp', { email });
      showMessage('OTP sent to your email!', 'success');
      setIsOtpSent(true);
    } catch (error) {
      showMessage('Error sending OTP. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/verify-otp', { email, otp });
      showMessage(response.data.message, 'success');
      setIsVerified(true);
  
      // Delay for success message, then navigate to dashboard
      setTimeout(() => {
        setIsModalOpen(false);
        navigate('/dashboard'); // ✅ Redirect to Dashboard
      }, 1500);
    } catch (error) {
      showMessage('Invalid OTP. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };
  
  // Handle "Get Started" button click
  const handleGetStartedClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  // Animated feature items with staggered reveal
  const FeatureItem = ({ icon: Icon, title, description, delay }) => {
    return (
      <div 
        className="feature-item"
        style={{ animationDelay: `${delay}ms` }}
      >
        <Icon className="feature-icon" size={48} />
        <h3 className="feature-title">{title}</h3>
        <p className="feature-description">{description}</p>
      </div>
    );
  };

  return (
    <div className="welcome-page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Protect Your Network with AI-Powered Anomaly Detection</h1>
          <p className="hero-subtitle">
            NetGuardian AI provides real-time threat detection and response, powered by advanced machine learning.
            Secure your digital assets and stay ahead of evolving cyber threats.
          </p>
          <a href="/signup" className="get-started-button" onClick={handleGetStartedClick}>
            Get Started Now
          </a>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="key-features-section">
        <h2 className="section-title">Key Features</h2>
        <div className="features-grid">
          <FeatureItem
            icon={ShieldCheck}
            title="Proactive Threat Prevention"
            description="Identify and neutralize threats before they impact your network."
            delay={100}
          />

          <FeatureItem
            icon={Brain}
            title="Intelligent Anomaly Detection"
            description="Leverage advanced AI algorithms to detect unusual network behavior."
            delay={200}
          />

          <FeatureItem
            icon={Layers}
            title="Seamless Integration"
            description="Easily integrate NetGuardian AI into your existing security infrastructure."
            delay={300}
          />

          <FeatureItem
            icon={Code}
            title="Customizable Rules and Policies"
            description="Tailor the system to your specific network environment and security needs."
            delay={400}
          />

          <FeatureItem
            icon={Download}
            title="Automated Reporting"
            description="Generate comprehensive reports to track security performance and compliance."
            delay={500}
          />

          <FeatureItem
            icon={KeyRound}
            title="Secure Access Control"
            description="Ensure only authorized users have access to sensitive network resources."
            delay={600}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} NetGuardian AI. All rights reserved.</p>
          <nav>
            <a href="/terms">Terms of Service</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/contact">Contact Us</a>
          </nav>
        </div>
      </footer>

      {/* Email Verification Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-title">Email Verification</h2>
            
            {/* Feedback message */}
            {message.text && (
              <div className={`message ${message.type}`}>
                {message.text}
              </div>
            )}
            
            {!isOtpSent ? (
              <form onSubmit={handleEmailSubmit} className="modal-form">
                <label htmlFor="email" className="modal-label">Enter your email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="modal-input"
                  placeholder="your.email@example.com"
                  required
                />
                <button 
                  type="submit" 
                  className="modal-button" 
                  disabled={loading}
                >
                  {loading ? 'Sending...' : 'Send OTP'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleOtpSubmit} className="modal-form">
                <label htmlFor="otp" className="modal-label">Enter OTP sent to your email:</label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="modal-input"
                  placeholder="Enter 6-digit code"
                  required
                />
                <button 
                  type="submit" 
                  className="modal-button"
                  disabled={loading}
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </button>
              </form>
            )}
            
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="close-modal-button"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;