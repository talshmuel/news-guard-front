import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';
import logo from '../../public/logo.jpg'
import { useEffect, useState } from 'react';


const handleLogout = () => {
  localStorage.removeItem('userData'); // Clear user data from localStorage
  window.location.href = '/'; // Redirect to login page
};

function NavigationBar({userData}){
    return(
        <header className="home-navbar">
        <div className="home-logo-container">
          <img src={logo} alt="News Guard Logo" className="home-logo" />
          <p className="home-news-guard-title">News Guard</p>
          <p className="home-hello-user">Hello, {userData.userFullName}</p>
        </div>
        <div className="home-center-links">
          <ul className="home-tab-list">
            <li>
              <Link to="/home">
                <button className="home-button">
                  <i className="fas fa-home"></i>
                </button>
              </Link>
            </li>
            <li>
              <Link to="/profile">
                <button className="home-button">
                  <i className="fas fa-user"></i>
                </button>
              </Link>
            </li>
            <li>
              <Link to="/new-report">
                <button className="home-button">
                  <i className="fas fa-plus"></i>
                </button>
              </Link>
            </li>
            <li>
              <Link to="/about">
                <button className="home-button">
                  <i className="fa-solid fa-info"></i>
                </button>
              </Link>
            </li>
          </ul> 
        </div>
        <div className="home-logout-container">
            <button className="home-logout-button" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i>
            </button>
        </div> 
      </header> 
    );
}

export default NavigationBar;