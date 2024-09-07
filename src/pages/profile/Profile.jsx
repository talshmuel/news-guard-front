import { Link } from 'react-router-dom';
import logo from '../../../public/logo.jpg';
import profile_img from '../../../public/profile-img.png';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import NavigationBar from '../Navigation';
import { useEffect, useState } from 'react';
import './Profile.css';
import Report from '../home/Report'; 


function ProfilePage() {
  const [activeTab, setActiveTab] = useState('reports');
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve logged-in user's data
  const userID = userData.userId;
  console.log("PROFILE: user id=" + userID)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8080/profile-page/get-profile?userID=${userID}`);
        //console.log('PROFILE: Response status:', response.status);

        if (response.ok)
        {
          const data = await response.json();
          // console.log('Fetched profile data:', data);
          setProfileData(data); 
        }
        else
        {
          const errorMessage = await response.text();
          //console.error('Response error:', errorMessage);

          if (response.status === 404) { // Not Found
            setError('Profile not found.');
          } else if (response.status === 500) { // Server Error
            setError('Server error occurred while fetching Profile.');
          } else {
            setError(`Error: ${errorMessage}`);
          }
        }
      } catch (error) {
        console.error('Error occurred during fetching Profile:', error);
        setError('An error occurred while fetching Profile. Please try again.');
      }
    };
 
    fetchProfile();
  }, [userID]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // ("PROFILE: reports: " + profileData.reports)
  };


  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userData');
  
    // Redirect to login page
    window.location.href = '/'; // Assuming '/' is the login route
  };


  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= profileData.reliabilityRate ? <FaStar key={i} /> : <FaRegStar key={i} />);
    }
    return stars;
  };


  return (
    <div className="profile-container">
      {error ? ( <p>{error}</p> ) : profileData ? (
          <div>
            <NavigationBar userData={userData}  />
            <div className="profile-headline-section">
              <h1 className="profile-headline">{profileData.firstName} {profileData.lastName}</h1>
              <img className="profile-details-img" 
              src={profileData.imageURL ? profileData.imageURL : profile_img} 
              alt="Profile" />
              <div className="profile-details-row">
                <p className="profile-details-text">Country: {profileData.country}</p>
                <p className="profile-details-text">Reliability: {renderStars()}</p>
              </div>
            </div>
  
            <div className="profile-tab-menu">
              <button
                className={`profile-tab ${activeTab === 'reports' ? 'active' : ''}`}
                onClick={() => handleTabClick('reports')}
              >
                Your Reports
              </button>
              <button
                className={`profile-tab ${activeTab === 'guarding' ? 'active' : ''}`}
                onClick={() => handleTabClick('guarding')}
              >
                Reports You're Guarding
              </button>
            </div>
  
            <div className="profile-tab-content">
              {activeTab === 'reports' && (
                <div className="profile-reports-section">
                  {Array.isArray(profileData.reports) && profileData.reports.length > 0 ? (
                    profileData.reports.map((report) => (
                      <Report key={report.id} report={report} />
                    ))
                  ) : (
                    <p className="profile-reports-section-txt">You have not submitted any reports.</p>
                  )}
                </div>
              )}
              {activeTab === 'guarding' && (
                <div className="profile-reports-section">
                  {Array.isArray(profileData.reportsThatTheUserIsAGuardOf) && profileData.reportsThatTheUserIsAGuardOf.length > 0 ? (
                    profileData.reportsThatTheUserIsAGuardOf.map((report) => (
                      <Report key={report.id} report={report} />
                    ))
                  ) : (
                    <p className="profile-reports-section-txt">You are not guarding any reports.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          <p className="profile-loading">Loading profile...</p>
        )}
    </div> 
    );

  // return (
  //   <div className="ignore">
  //     {error ? ( <p>{error}</p> ) : profileData ? (
  
  //         <div className="profile-container">
  //           <header className="home-navbar">
  //         <div className="home-logo-container">
  //           <img src={logo} alt="News Guard Logo" className="home-logo" />
  //           <p className="home-news-guard-title">News Guard</p>
  //           <p className="home-hello-user">Hello, {userData.userFullName}</p>
  //         </div>
  //         <div className="home-center-links">
  //           <ul className="home-tab-list">
  //             <li>
  //               <Link to="/home">
  //                 <button className="home-button">
  //                   <i className="fas fa-home"></i>
  //                 </button>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link to="/profile">
  //                 <button className="home-button">
  //                   <i className="fas fa-user"></i>
  //                 </button>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link to="/new-report">
  //                 <button className="home-button">
  //                   <i className="fas fa-plus"></i>
  //                 </button>
  //               </Link>
  //             </li>
  //             <li>
  //               <Link to="/about">
  //                 <button className="home-button">
  //                   <i className="fa-solid fa-info"></i>
  //                 </button>
  //               </Link>
  //             </li>
  //           </ul> 
  //         </div> 
  //         <div className="home-logout-container">
  //             <button className="home-logout-button" onClick={handleLogout}>
  //               <i className="fas fa-sign-out-alt"></i>
  //             </button>
  //         </div>
  //       </header>
  
            
  
  //           <div className="profile-headline-section">
  //             <h1 className="profile-headline">{profileData.firstName} {profileData.lastName}</h1>
  //             <img className="profile-details-img" 
  //             src={profileData.imageURL ? profileData.imageURL : profile_img} 
  //             alt="Profile" />
  //             <div className="profile-details-row">
  //               <p className="profile-details-text">Country: {profileData.country}</p>
  //               <p className="profile-details-text">Reliability: {renderStars()}</p>
  //             </div>
  //           </div>
  
  //           <div className="profile-tab-menu">
  //             <button
  //               className={`profile-tab ${activeTab === 'reports' ? 'active' : ''}`}
  //               onClick={() => handleTabClick('reports')}
  //             >
  //               Your Reports
  //             </button>
  //             <button
  //               className={`profile-tab ${activeTab === 'guarding' ? 'active' : ''}`}
  //               onClick={() => handleTabClick('guarding')}
  //             >
  //               Reports You're Guarding
  //             </button>
  //           </div>
  
  //           <div className="profile-tab-content">
  //             {activeTab === 'reports' && (
  //               <div className="profile-reports-section">
  //                 {Array.isArray(profileData.reports) && profileData.reports.length > 0 ? (
  //                   profileData.reports.map((report) => (
  //                     <Report key={report.id} report={report} />
  //                   ))
  //                 ) : (
  //                   <p className="profile-reports-section-txt">You have not submitted any reports.</p>
  //                 )}
  //               </div>
  //             )}
  //             {activeTab === 'guarding' && (
  //               <div className="profile-reports-section">
  //                 {Array.isArray(profileData.reportsThatTheUserIsAGuardOf) && profileData.reportsThatTheUserIsAGuardOf.length > 0 ? (
  //                   profileData.reportsThatTheUserIsAGuardOf.map((report) => (
  //                     <Report key={report.id} report={report} />
  //                   ))
  //                 ) : (
  //                   <p className="profile-reports-section-txt">You are not guarding any reports.</p>
  //                 )}
  //               </div>
  //             )}
  //           </div>
  //         </div>
  //       ) : (
  //         <p className="profile-loading">Loading profile...</p>
  //       )}
  //   </div> 
  //   );

/*************************************************************** */


}

export default ProfilePage;

/*

 return (
  <div className="ignore">
    {error ? ( <p>{error}</p> ) : profileData ? (

        <div className="profile-container">
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

          

          <div className="profile-headline-section">
            <h1 className="profile-headline">{profileData.firstName} {profileData.lastName}</h1>
            <img className="profile-details-img" 
            src={profileData.imageURL ? profileData.imageURL : profile_img} 
            alt="Profile" />
            <div className="profile-details-row">
              <p className="profile-details-text">Country: {profileData.country}</p>
              <p className="profile-details-text">Reliability: {renderStars()}</p>
            </div>
          </div>

          <div className="profile-tab-menu">
            <button
              className={`profile-tab ${activeTab === 'reports' ? 'active' : ''}`}
              onClick={() => handleTabClick('reports')}
            >
              Your Reports
            </button>
            <button
              className={`profile-tab ${activeTab === 'guarding' ? 'active' : ''}`}
              onClick={() => handleTabClick('guarding')}
            >
              Reports You're Guarding
            </button>
          </div>

          <div className="profile-tab-content">
            {activeTab === 'reports' && (
              <div className="profile-reports-section">
                {Array.isArray(profileData.reports) && profileData.reports.length > 0 ? (
                  profileData.reports.map((report) => (
                    <Report key={report.id} report={report} />
                  ))
                ) : (
                  <p className="profile-reports-section-txt">You have not submitted any reports.</p>
                )}
              </div>
            )}
            {activeTab === 'guarding' && (
              <div className="profile-reports-section">
                {Array.isArray(profileData.reportsThatTheUserIsAGuardOf) && profileData.reportsThatTheUserIsAGuardOf.length > 0 ? (
                  profileData.reportsThatTheUserIsAGuardOf.map((report) => (
                    <Report key={report.id} report={report} />
                  ))
                ) : (
                  <p className="profile-reports-section-txt">You are not guarding any reports.</p>
                )}
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="profile-loading">Loading profile...</p>
      )}
  </div> 
  );

*/