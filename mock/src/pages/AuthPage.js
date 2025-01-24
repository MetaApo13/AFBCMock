import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../config.js'; // Import Firebase configuration
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';

const AuthPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    agreedToTerms: false,
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const { email, password, fullName } = formData;

    try {
      if (isLoginMode) {
        // Login with email and password
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        // Sign up with email and password
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        // You can use `userCredential.user` to save additional user data in the database if needed
        console.log('User registered:', userCredential.user);
      }
      navigate('/'); // Redirect to the home page
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/'); // Redirect to the home page
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleAuthMode = () => {
    setIsLoginMode(!isLoginMode);
    setError('');
  };

  return (
    <div style={styles.container}>
      {/* Navigation */}
      <nav style={styles.nav}>
        <div style={styles.navBrand}>
          <h1 style={styles.navTitle} onClick={() => navigate('/')}>
            SkillSync
          </h1>
        </div>
        <div style={styles.navLinks}>
          <button onClick={toggleAuthMode} style={styles.navButton}>
            {isLoginMode ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </nav>

      <div
        style={{
          ...styles.wrapper,
          flexDirection: isLoginMode ? 'row' : 'row-reverse',
        }}
      >
        <div style={styles.illustration}>
          <div style={styles.illustrationContent}>
            <h2 style={styles.illustrationTitle}>
              {isLoginMode ? 'Welcome Back!' : 'Start Your Journey'}
            </h2>
            <p style={styles.illustrationText}>
              {isLoginMode
                ? 'Connect to unlock professional opportunities'
                : 'Join a community of skilled professionals'}
            </p>
            <button onClick={toggleAuthMode} style={styles.modeToggleBtn}>
              {isLoginMode ? 'Create Account' : 'Login to Account'}
            </button>
          </div>
        </div>

        <div style={styles.formContainer}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <h1 style={styles.formTitle}>
              {isLoginMode ? 'Login to SkillSync' : 'Create Your Account'}
            </h1>

            {!isLoginMode && (
              <div style={styles.formGroup}>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
            )}

            <div style={styles.formGroup}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
                required
              />
            </div>

            {!isLoginMode && (
              <div style={{ ...styles.formGroup, ...styles.termsGroup }}>
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  id="terms-checkbox"
                  style={styles.checkbox}
                  required
                />
                <label htmlFor="terms-checkbox" style={styles.termsLabel}>
                  I agree to SkillSync Terms & Conditions
                </label>
              </div>
            )}

            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

            <button type="submit" style={styles.submitBtn}>
              {isLoginMode ? 'Login' : 'Create Account'}
            </button>

            <div style={styles.divider}>
              <span style={styles.dividerSpan}>or</span>
            </div>

            <div style={styles.socialLogin}>
              <button
                type="button"
                onClick={handleGoogleLogin}
                style={{ ...styles.socialBtn, ...styles.googleBtn }}
              >
                Continue with Google
              </button>
              <button type="button" style={{ ...styles.socialBtn, ...styles.linkedinBtn }}>
                Continue with LinkedIn
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};


const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    fontFamily: 'Inter, sans-serif',
  },
  nav: {
    width: '100%',
    padding: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
  },
  navBrand: {
    display: 'flex',
    alignItems: 'center',
  },
  navTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#4338ca',
    cursor: 'pointer',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
  },
  navButton: {
    backgroundColor: '#4338ca',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
  },
  wrapper: {
    width: '1000px',
    display: 'flex',
    backgroundColor: 'white',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
    borderRadius: '20px',
    overflow: 'hidden',
  },
  illustration: {
    flex: 1,
    background: 'linear-gradient(135deg, #4338ca, #6366f1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    textAlign: 'center',
    padding: '40px',
  },
  illustrationContent: {
    maxWidth: '300px',
  },
  illustrationTitle: {
    fontSize: '2rem',
    marginBottom: '15px',
  },
  illustrationText: {
    marginBottom: '20px',
  },
  modeToggleBtn: {
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: '2px solid white',
    padding: '10px 20px',
    borderRadius: '50px',
  },
  formContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  form: {
    width: '100%',
    maxWidth: '350px',
  },
  formTitle: {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#1f2937',
  },
  formGroup: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '12px',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    transition: 'border-color 0.3s',
  },
  termsGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  checkbox: {
    marginRight: '10px',
  },
  termsLabel: {
    fontSize: '0.9rem',
  },
  submitBtn: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4338ca',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    marginBottom: '20px',
  },
  divider: {
    textAlign: 'center',
    position: 'relative',
    margin: '20px 0',
  },
  dividerSpan: {
    background: 'white',
    padding: '0 10px',
    position: 'relative',
    zIndex: 1,
  },
  socialLogin: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  socialBtn: {
    width: '100%',
    padding: '12px',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    background: 'white',
  },
  googleBtn: {},
  linkedinBtn: {},
};

export default AuthPage;