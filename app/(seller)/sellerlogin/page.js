"use client";
import React, { useState } from 'react';

const sellerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === '' || password.trim() === '') {
      setMessage('Please enter email and password');
      return;
    }
    localStorage.setItem('sellerEmail', email);
    localStorage.setItem('sellerPassword', password);

    setMessage('Login Successfully');
    console.log('Seller Email:', email);
    console.log('Seller Password:', password);

    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <h1>Seller Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br />
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
          />
        </div>
        <br />
        <div>
          <label>Password:</label><br />
          <input
            type="password" value={password}  onChange={(e) => setPassword(e.target.value)} required
          />
        </div>
        <br />
        <button type="submit">Login</button>
      </form>

      
    </div>
  );
};

export default sellerLogin;