"use client";
import React, { useState } from 'react';

const BuyerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      setMessage('Please enter email and password');
      return;
    }

    localStorage.setItem('buyerEmail', email);
    localStorage.setItem('buyerPassword', password);

    setMessage('Login Successfully ');
    console.log('Buyer Email:', email);
    console.log('Buyer Password:', password);

    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h1>Buyer Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <br />
        <button type="submit">Login</button>
      </form>

      {message && (
        <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>
      )}
    </div>
  );

  
};

export default BuyerLogin;

