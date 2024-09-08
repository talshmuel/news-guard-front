import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../../../public/logo.jpg'
import React, { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('login successful:', result);
        localStorage.setItem('userData', JSON.stringify(result)); // 3/9

        localStorage.setItem('userIdForLocation', JSON.stringify(result.userId)); // 3/9
        const globalUserId = JSON.parse(localStorage.getItem('userIdForLocation'));
        console.log("user id location - " + globalUserId)

        navigate('/home');
      }
      else {
        const errorMessage = await response.text();

        if (response.status === 401) {// Unauthorized - Incorrect password
          alert('Incorrect password. Please try again.');
        } else if (response.status === 404) { // Not Found - Email does not exist
          alert('No account found with this email. Please check the email or sign up.');
        } else if (response.status === 400) { // Bad Request - Other issues
          alert('Invalid login request. Please make sure all fields are filled out correctly.');
        } else {
          alert(`Login failed: ${errorMessage}`);
        }
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
      alert('An error occurred during login. Please try again.');
    }
  };


  return (
    <div className="login-container">
      <img src={logo} alt="NewsGuard Logo" className="login-logo"/>
      <h1 className="login-title">News Guard</h1>
      
      <form 
      onSubmit={handleSubmit}
      className="login-form">
        <div className="login-form-section">

          <div className="login-input-group">
            <label className="login-input-label">Email:</label>
              <input 
                type="email" 
                name="email" 
                className="login-input-box"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required
              />
          </div>
          
          <div className="login-input-group">
            <label className="login-input-label">Password:</label>
            <input 
              type="password" 
              name="password" 
              className="login-input-box" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            </div>
            
          </div>

        <button type="submit" className="login-login-button">Login</button>
      </form>


      <p className='login-footer-text'>Don't have an account yet? No worries!</p>
      <Link to="/signup">
        <button className="login-signup-button">Sign Up!</button>
      </Link>
    </div>
  );
}

export default LoginPage;