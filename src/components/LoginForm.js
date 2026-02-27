import React, { useState, useContext } from 'react';
import { ThemeContext } from './ThemeContext';

function LoginForm({ onLogin, onCancel, onRegister }) {
  const { darkMode } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      onRegister(email, password);
    } else {
      onLogin(email, password);
    }
    setEmail('');
    setPassword('');
  };

  return (
    <div className="modal-overlay" style={overlayStyle}>
      <div
        className="modal-content"
        style={{
          ...modalStyle,
          backgroundColor: 'var(--background-color,#1a0a3a)',
          color: 'var(--text-color-dark, #a67c00;)',
          border: '1px solid var(--border-color-light, #ddd)',
        }}
      >
        <h2>{isRegister ? 'Register' : 'Login'}</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              ...inputStyle,
              backgroundColor: 'var(--input-bg-light,rgb(65, 2, 168))',
              color: 'var(--text-color-dark,rgb(206, 209, 42))',
              border: '1px solid var(--border-color-light, #ccc)',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              ...inputStyle,
              backgroundColor: 'var(--input-bg-light, rgb(65, 2, 168))',
              color: 'var(--text-color-dark, rgb(206, 209, 42))',
              border: '1px solid var(--border-color-light, #ccc)',
            }}
          />
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              type="submit"
              className="btn btn-primary"
              style={{
                flex: 1,
                marginRight: '0.5rem',
                backgroundColor: 'var(--btn-primary-bg-light, #4b0082)',
                color: 'var(--btn-primary-text-light, #fff)',
                border: 'none',
              }}
            >
              {isRegister ? 'Register' : 'Login'}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              style={{
                flex: 1,
                backgroundColor: 'var(--btn-secondary-bg-light, #4b0082)',
                color: 'var(--btn-secondary-text-light, #fff)',
                border: 'none',
              }}
            >
              Cancel
            </button>
          </div>
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--btn-primary-bg-light, #007bff)',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: '0.9rem',
              }}
            >
              {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalStyle = {
  padding: '2rem',
  borderRadius: '8px',
  width: '320px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
};

const inputStyle = {
  marginBottom: '1rem',
  padding: '0.5rem',
  fontSize: '1rem',
  borderRadius: '4px',
};

export default LoginForm;
