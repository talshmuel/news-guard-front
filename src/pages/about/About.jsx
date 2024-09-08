import './About.css';
import logo from '../../../public/logo.jpg';
import NavigationBar from '../Navigation';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function AboutPage(){
  const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve the logged-in user's data

  return(
    <div className="home-container">
      <NavigationBar userData={userData}  />
      <div className="home-reports-section">
          <img src={logo} alt="NewsGuard Logo" className="about-logo" />
              <h1 className="about-title">About News Guard</h1>
              <div className="about-content">
                <p>
                    Nowadays, it's hard to tell which news is real and which is fake, because there is so much information out there.
                    Fake news can mislead people and hurt trust in important institutions. 
                    <strong> News Guard</strong> is a news platform designed to fight fake news through community verification.
                </p>
                
                <p><strong>The process step by step:</strong></p>
                <ol>
                    <li>The user publishes a report.</li>
                    <li>The system tracks nearby users (“Guards”).</li>
                    <li>Guards get a 24-hour window to verify the report.</li>
                    <li>
                    After a calculation process, the report, the reporter, and the guards 
                    all receive the updated reliability rate.
                    </li>
                </ol>

                <p>
                    By participating in this verification system, you contribute to a more reliable and trustworthy information environment.
                    Help us eliminate fake news and work together to clean up the media landscape for a better-informed world.
                </p>
              </div>
      </div>
    </div>
  )
}

export default AboutPage;