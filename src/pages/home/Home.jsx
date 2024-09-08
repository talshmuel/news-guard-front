import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Home.css';
import Report from './Report';
import NavigationBar from '../Navigation';
import logo from '../../../public/logo.jpg';


function HomePage(){
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve the logged-in user's data
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('https://news-guard-c0fjanc7ethue7dn.eastus-01.azurewebsites.net/home-page/get-last-twenty-reports');

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