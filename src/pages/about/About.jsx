import { Link, useNavigate } from 'react-router-dom';
import './About.css';
import logo from '../../../public/logo.jpg';
import { useEffect, useState } from 'react';

function AboutPage(){
    const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve the logged-in user's data
    console.log('user id: ', userData.userId);

    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem('userData');
      
        // Redirect to login page
        window.location.href = '/'; // Assuming '/' is the login route
      };

    // return(
    //     <div className="about-container">

    //     <header className="home-navbar">
    //         <div className="home-logo-container">
    //             <img src={logo} alt="News Guard Logo" className="home-logo" />
    //             <p className="home-hello-user">Hello {userData.userFullName} </p>
    //             </div>
    //             <div className="home-center-links">
    //             <ul className="home-tab-list">
    //                 <li>
    //                 <Link to="/home">
    //                     <button className="home-button">
    //                     <i className="fas fa-home"></i>
    //                     </button>
    //                 </Link>
    //                 </li>
    //                 <li>
    //                 <Link to="/profile">
    //                     <button className="home-button">
    //                     <i className="fas fa-user"></i>
    //                     </button>
    //                 </Link>
    //                 </li>
    //                 <li>
    //                 <Link to="/new-report">
    //                     <button className="home-button">
    //                     <i className="fas fa-plus"></i>
    //                     </button>
    //                 </Link>
    //                 </li>
    //                 <li>
    //                 <Link to="/about">
    //                     <button className="home-button">
    //                     <i className="fa-solid fa-info"></i>
    //                     </button>
    //                 </Link>
    //                 </li>
    //             </ul> {/*home-tab-list*/}
    //             </div> {/*home-center-links*/}
    //             <div className="home-logout-container">
    //             {/* <Link to="/"> */}
    //                 <button className="home-logout-button" onClick={handleLogout}>
    //                 <i className="fas fa-sign-out-alt"></i>
    //                 </button>
    //             {/* </Link> */}
    //             </div> {/*home-logout-container*/}
    //         </header> {/*home-navbar*/}

    //         <img src={logo} alt="NewsGuard Logo" className="about-logo" />
    //         <h1 className="about-title">About News Guard</h1>
    //         <div className="about-content">
    //             {/* Add your about page text here */}
    //             <p>
    //             Welcome to News Guard, your reliable source for discerning fact from fiction in today's media. 
    //             At News Guard, we are committed to ensuring the integrity of information shared around the world. 
    //             Join us in the fight against fake news!
    //             </p>
    //         </div>
    //         <Link to="/">
    //             <button className="about-home-button">Back to Home</button>
    //         </Link>
    //     </div>
    // );

    return(
        <div className="home-container">
    
          <header className="home-navbar">
            <div className="home-logo-container">
              <img src={logo} alt="News Guard Logo" className="home-logo" />
              <p className="home-hello-user">Hello {userData.userFullName} </p>
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
              </ul> {/*home-tab-list*/}
            </div> {/*home-center-links*/}
            <div className="home-logout-container">
              {/* <Link to="/"> */}
                <button className="home-logout-button" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i>
                </button>
              {/* </Link> */}
            </div> {/*home-logout-container*/}
          </header> {/*home-navbar*/}
        
        <div className="home-reports-section">
            <img src={logo} alt="NewsGuard Logo" className="about-logo" />
                <h1 className="about-title">About News Guard</h1>
                <div className="about-content">
                    {/* Add your about page text here */}
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
