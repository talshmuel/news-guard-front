import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Home.css';
import logo from '../../../public/logo.jpg';
import Report from './Report';
import NavigationBar from '../Navigation';



function HomePage(){
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve the logged-in user's data
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('http://localhost:8080/home-page/get-last-twenty-reports');

        if (response.ok)
        {
          const data = await response.json();
          setReports(data);
          console.log('Fetched reports:', data);
        }
        else
        {
          const errorMessage = await response.text();
          console.error('Response error:', errorMessage);

          if (response.status === 404) { // Not Found
            setError('Reports not found.');
          } else if (response.status === 500) { // Server Error
            setError('Server error occurred while fetching reports.');
          } else {
            setError(`Error: ${errorMessage}`);
          }
        }
      } catch (error) {
        console.error('Error occurred during fetching reports:', error);
        setError('An error occurred while fetching reports. Please try again.');
      }
    };

    fetchReports();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData'); // Clear user data from localStorage
    window.location.href = '/'; // Redirect to login page
  };
  

  return(
    <div className="home-container">

      <NavigationBar userData={userData}  />
      {/* <header className="home-navbar">
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
      </header> */}
      
    
      <div className="home-reports-section">
          {error ? (
        <p>{error}</p>
          ) : Array.isArray(reports) && reports.length > 0 ? (
          reports.map((report) => (
          <Report key={report.reportID} report={report} />
          ))
          ) : (
        <p className="home-loading">Loading...</p>
        )}
      </div> 

    </div>
  )
}

export default HomePage;








