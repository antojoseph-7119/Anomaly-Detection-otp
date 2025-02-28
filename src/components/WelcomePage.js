import React, { useState } from 'react';
import { ShieldCheck, Brain, Layers, Code, Download, KeyRound } from 'lucide-react';
import './Welcome.css';
import axios from 'axios';

const WelcomePage = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Send OTP to Email
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/send-otp', { email });
      alert('OTP sent to your email!');
      setIsOtpSent(true);
    } catch (error) {
      alert('Error sending OTP');
    }
  };

  // Verify OTP
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/verify-otp', { email, otp });
      alert(response.data.message);
      setIsVerified(true);
      setIsModalOpen(false); // Close modal after verification
    } catch (error) {
      alert('Invalid OTP. Please try again.');
    }
  };

  // Handle "Get Started" button click
  const handleGetStartedClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
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
          <div className="feature-item">
            <ShieldCheck className="feature-icon" size={48} />
            <h3 className="feature-title">Proactive Threat Prevention</h3>
            <p className="feature-description">
              Identify and neutralize threats before they impact your network.
            </p>
          </div>

          <div className="feature-item">
            <Brain className="feature-icon" size={48} />
            <h3 className="feature-title">Intelligent Anomaly Detection</h3>
            <p className="feature-description">
              Leverage advanced AI algorithms to detect unusual network behavior.
            </p>
          </div>

          <div className="feature-item">
            <Layers className="feature-icon" size={48} />
            <h3 className="feature-title">Seamless Integration</h3>
            <p className="feature-description">
              Easily integrate NetGuardian AI into your existing security infrastructure.
            </p>
          </div>

          <div className="feature-item">
            <Code className="feature-icon" size={48} />
            <h3 className="feature-title">Customizable Rules and Policies</h3>
            <p className="feature-description">
              Tailor the system to your specific network environment and security needs.
            </p>
          </div>

          <div className="feature-item">
            <Download className="feature-icon" size={48} />
            <h3 className="feature-title">Automated Reporting</h3>
            <p className="feature-description">
              Generate comprehensive reports to track security performance and compliance.
            </p>
          </div>

          <div className="feature-item">
            <KeyRound className="feature-icon" size={48} />
            <h3 className="feature-title">Secure Access Control</h3>
            <p className="feature-description">
              Ensure only authorized users have access to sensitive network resources.
            </p>
          </div>
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
            {!isOtpSent ? (
              <form onSubmit={handleEmailSubmit} className="modal-form">
                <label htmlFor="email" className="modal-label">Enter your email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="modal-input"
                  required
                />
                <button type="submit" className="modal-button">
                  Send OTP
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
                  required
                />
                <button type="submit" className="modal-button">
                  Verify OTP
                </button>
              </form>
            )}
            <button onClick={() => setIsModalOpen(false)} className="close-modal-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;
