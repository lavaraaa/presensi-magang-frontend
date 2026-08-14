import React, { useState } from 'react';
import axios from 'axios';

const Register = ({ show, onClose, toLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/register', formData);
      setMessage('Registrasi berhasil! Silakan login.');
      setFormData({ username: '', email: '', password: '' });
      setTimeout(() => {
        toLogin();
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Registrasi gagal. Coba lagi.');
    }
  };

  if (!show) return null;

  return (
<div style={styles.overlay} onClick={onClose}>
      <div style={styles.card} onClick={(e) => e.stopPropagation()}>
        <button className="btn-close float-end mt-1" onClick={onClose}></button>
        <h4 className="text-center mb-1">Register</h4>

        {message && <div className="alert alert-info">{message}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-1">
            <label className="form-label">Username</label>
            <input 
              name="username" 
              type="text" 
              className="form-control" 
              value={formData.username} 
              onChange={handleChange} 
              required
              placeholder="Masukkan Username"
              style={{fontSize:'15px'}}
            />
          </div>
          <div className="mb-1">
            <label className="form-label">Email</label>
            <input 
              name="email" 
              type="email" 
              className="form-control" 
              value={formData.email} 
              onChange={handleChange} 
              required
              placeholder="Masukkan Email"
              style={{fontSize:'15px'}}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Kata Sandi</label>
            <input 
              name="password" 
              type="password" 
              className="form-control" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              placeholder="Masukkan Kata Sandi"
              style={{fontSize:'15px'}}
            />
          </div>
          <button className="btn btn-dark w-100" type="submit">Register</button>
        </form>

        <p className="text-center mt-2">
          Sudah punya akun?{' '}
          <button
            type="button"
            onClick={() => {
              onClose();
              toLogin();
            }}
            className="btn btn-link p-0 mb-2"
            style={{ fontWeight: 600 }}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1600,
    overflowY: 'auto',
    padding: '10px',
  },
  card: {
    background: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '100%',
    maxWidth: '370px',
    position: 'relative',
    boxShadow: '0 0 20px rgba(0,0,0,0.3)',
    zIndex: 1500,
    margin: '10px',
    maxHeight: '90vh',
    overflowY: 'auto',
    paddingBottom: 5
  },
};

export default Register;
