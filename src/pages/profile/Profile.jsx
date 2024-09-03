import { Link } from 'react-router-dom';
import logo from '../../../public/logo.jpg';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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



  return (
  <div className="ignore">
    {error ? ( <p>{error}</p> ) : profileData ? (

        <div className="profile-container">
          {/* NAVIGATION BAR */}
            <header className="profile-navbar">
              <div className="profile-logo-container">
                <img src={logo} alt="News Guard Logo" className="profile-logo" />
              </div> {/* profile-logo-container */}
              <div className="profile-center-links">
                <ul className="profile-tab-list">
                  <li>
                    <Link to="/home">
                      <button className="profile-button">
                      <i className="fas fa-home"></i>
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile">
                      <button className="profile-button">
                      <i className="fas fa-user"></i>
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to="/new-report">
                      <button className="profile-button">
                      <i className="fas fa-plus"></i>
                      </button>
                    </Link>
                  </li>
                </ul>
              </div> {/* profile-center-links */}
              <div className="profile-logout-container">
                <Link to="/">
                  <button className="home-logout-button">
                  <i className="fas fa-sign-out-alt"></i>
                  </button>
                </Link>
              </div> {/* profile-logout-container */}
            </header> {/* profile-navbar */}
          {/* END- NAVIGATION BAR */}
          

          {/* Headline Section */}
          <div className="profile-headline-section">
            <h1 className="profile-headline">{profileData.firstName} {profileData.lastName}</h1>
            <img className="profile-details-img" src={profileData.imageURL} alt="Profile" />
            <div className="profile-details-row">
              <p className="profile-details-text">Country: {profileData.country}</p>
              <p className="profile-details-text">Reliability: {profileData.reliabilityRate}</p>
            </div>
          </div>

          {/* Tab Menu */}
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

          {/* Tab Content */}
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
                {Array.isArray(profileData.IDReportsThatTheUserIsAGuardOf) && profileData.IDReportsThatTheUserIsAGuardOf.length > 0 ? (
                  profileData.IDReportsThatTheUserIsAGuardOf.map((report) => (
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
  </div> /* profile-container */
  );
}

export default ProfilePage;


  // return (
  //   <div className="profile-container">
  //     {error ? ( <p>{error}</p> ) : profileData ? (
  
  //         <div>
  //             <header className="profile-navbar">
  //               <div className="profile-logo-container">
  //                 <img src={logo} alt="News Guard Logo" className="profile-logo" />
  //               </div>
  //                 <div className="profile-center-links">
  //                 <ul className="profile-tab-list">
  //                   <li>
  //                     <Link to="/home">
  //                       <button className="profile-button">
  //                       <i className="fas fa-home"></i>
  //                       </button>
  //                     </Link>
  //                   </li>
  //                   <li>
  //                     <Link to="/profile">
  //                       <button className="profile-button">
  //                       <i className="fas fa-user"></i>
  //                       </button>
  //                     </Link>
  //                   </li>
  //                   <li>
  //                     <Link to="/new-report">
  //                       <button className="profile-button">
  //                       <i className="fas fa-plus"></i>
  //                       </button>
  //                     </Link>
  //                   </li>
  //                 </ul>
  //               </div>
  //           <div className="profile-logout-container">
  //             <Link to="/">
  //               <button className="home-logout-button">
  //               <i className="fas fa-sign-out-alt"></i>
  //               </button>
  //             </Link>
  //           </div>
  //             </header>
  
  //           {/* Headline Section */}
  //           <div className="profile-headline-section">
  //             <h1 className="profile-headline">{profileData.firstName} {profileData.lastName}</h1>
  //             <img className="profile-details-img" src={profileData.imageURL} alt="Profile" />
  //             <div className="profile-details-row">
  //               <p className="profile-details-text">Country: {profileData.country}</p>
  //               <p className="profile-details-text">Reliability: {profileData.reliabilityRate}</p>
  //             </div>
  //           </div>
  
  //           {/* Tab Menu */}
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
  
  //           {/* Tab Content */}
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
  //                 {Array.isArray(profileData.IDReportsThatTheUserIsAGuardOf) && profileData.IDReportsThatTheUserIsAGuardOf.length > 0 ? (
  //                   profileData.IDReportsThatTheUserIsAGuardOf.map((report) => (
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



//   return (
//   <div className="profile-container">
//     {error ? (<p>{error}</p>) : profileData ?
//   (
//     <>
//     <header className="profile-navbar">
//       <div className="profile-logo-container">
//         <img src={logo} alt="News Guard Logo" className="profile-logo" />
//       </div>
//       <div className="profile-center-links">
//         <ul className="profile-tab-list">
//           <li>
//             <Link to="/home">
//               <button className="profile-button">
//                 <i className="fas fa-home"></i>
//               </button>
//             </Link>
//           </li>
//           <li>
//             <Link to="/profile">
//               <button className="profile-button">
//                 <i className="fas fa-user"></i>
//               </button>
//             </Link>
//           </li>
//           <li>
//             <Link to="/new-report">
//               <button className="profile-button">
//                 <i className="fas fa-plus"></i>
//               </button>
//             </Link>
//           </li>
//         </ul> {/*profile-tab-list*/}
//       </div> {/*profile-center-links*/}
//       <div className="profile-logout-container">
//         <Link to="/">
//           <button className="home-logout-button">
//             <i className="fas fa-sign-out-alt"></i>
//           </button>
//         </Link>
//       </div> {/*profile-logout-container*/}
//     </header> {/*profile-navbar*/}
        
//     {/* Headline Section */}
//     <div className="profile-headline-section">
//       <h1 className="profile-headline">
//         {profileData?.firstName} {profileData?.lastName}
//       </h1>
//       <img className="profile-details-img" src={profileData?.imageURL} alt="Profile" />
//       <div className="profile-details-row">
//         <p className="profile-details-text">Country: {profileData?.country}</p>
//         <p className="profile-details-text">Reliability: {profileData?.reliabilityRate}</p>
//       </div>
//     </div> {/*profile-headline-section*/}
//     {/* Headline Section */}

//     {/* Tab Menu */}
//     <div className="profile-tab-menu">
//     <button
//       className={`profile-tab ${activeTab === 'reports' ? 'active' : ''}`}
//       onClick={() => handleTabClick('reports')}
//     >
//       Your Reports
//     </button>
//     <button
//       className={`profile-tab ${activeTab === 'guarding' ? 'active' : ''}`}
//       onClick={() => handleTabClick('guarding')}
//     >
//       Reports You're Guarding
//     </button>
//     </div> {/*profile-tab-menu*/}
//     {/* Tab Menu */}

//     {/* Tab Content */}
//     <div className="profile-tab-content">
//     {activeTab === 'reports' && (
//       <div className="profile-reports-section">
//         {Array.isArray(profileData?.reports) && profileData.reports.length > 0 ? (
//           profileData.reports.map((report) => (
//             <Report key={report.id} report={report} />
//           ))
//         ) : (
//           <p className="profile-reports-section-txt">You have not submitted any reports.</p>
//         )}
//       </div> {/*profile-tab-content*/}
//     )}

//     {activeTab === 'guarding' && (
//       <div className="profile-reports-section">
//         {Array.isArray(profileData?.IDReportsThatTheUserIsAGuardOf) && profileData.IDReportsThatTheUserIsAGuardOf.length > 0 ? (
//           profileData.IDReportsThatTheUserIsAGuardOf.map((report) => (
//             <Report key={report.id} report={report} />
//           ))
//         ) : (
//           <p className="profile-reports-section-txt">You are not guarding any reports.</p>
//         )}
//       </div> {/*profile-tab-content*/}
//     )}

    
//   </div> {/*profile-tab-content*/}
//   {/* Tab Content */}
//   </>
// ) : (
//   <p>Loading profile...</p>
// )}
// </div>
// );







  // return (
  //   <div className="profile-container">
  //     {error ? (
  //       <p>{error}</p>
  //     ) : profileData ? (
  //       <div>
  //         {/* Headline Section */}
  //         <div className="profile-headline-section">
  //           <h1 className="profile-headline">{profileData.firstName} {profileData.lastName}</h1>
  //           <img className="profile-details-img" src={profileData.imageURL} alt="Profile" />
  //           <div className="profile-details-row">
  //             <p className="profile-details-text">Country: {profileData.country}</p>
  //             <p className="profile-details-text">Reliability: {profileData.reliabilityRate}</p>
  //           </div>
  //         </div>

  //         {/* Tab Menu */}
  //         <div className="profile-tab-menu">
  //           <button
  //             className={`profile-tab ${activeTab === 'reports' ? 'active' : ''}`}
  //             onClick={() => handleTabClick('reports')}
  //           >
  //             Your Reports
  //           </button>
  //           <button
  //             className={`profile-tab ${activeTab === 'guarding' ? 'active' : ''}`}
  //             onClick={() => handleTabClick('guarding')}
  //           >
  //             Reports You're Guarding
  //           </button>
  //         </div>

  //         {/* Tab Content */}
  //         <div className="profile-tab-content">
  //           {activeTab === 'reports' && (
  //             <div className="profile-reports-section">
  //               {Array.isArray(profileData.reports) && profileData.reports.length > 0 ? (
  //                 profileData.reports.map((report) => (
  //                   <Report key={report.id} report={report} />
  //                 ))
  //               ) : (
  //                 <p className="profile-reports-section-txt">You have not submitted any reports.</p>
  //               )}
  //             </div>
  //           )}
  //           {activeTab === 'guarding' && (
  //             <div className="profile-reports-section">
  //               {Array.isArray(profileData.IDReportsThatTheUserIsAGuardOf) && profileData.IDReportsThatTheUserIsAGuardOf.length > 0 ? (
  //                 profileData.IDReportsThatTheUserIsAGuardOf.map((report) => (
  //                   <Report key={report.id} report={report} />
  //                 ))
  //               ) : (
  //                 <p className="profile-reports-section-txt">You are not guarding any reports.</p>
  //               )}
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     ) : (
  //       <p>Loading profile...</p>
  //     )}
  //   </div>




























  // return (
  //   <div className="profile-container">
  //     {error ? (
  //       <p>{error}</p>
  //     ) : profileData ? (
  //       <div>
  //         {/* User Details Section */}
  //       <div className="profile-details">
  //         <h1 className="profile-headline">{profileData.firstName} {profileData.lastName}</h1>
  //         <img className="profile-details-img" src={profileData.imageURL} alt="Profile Picture" />
  //         <p className="profile-details-text">Country: {profileData.country}</p>
  //         <p className="profile-details-text" >Email: {profileData.email}</p>
  //         <p className="profile-details-text">Phone Number: {profileData.phoneNumber}</p>
  //         <p className="profile-details-text">Reliability: {profileData.reliabilityRate}</p>
  //       </div>

  //       <div className="profile-all-reports-section">

  //         {/* ################ REPORTS: #################*/}          
  //         <div className="profile-reports-section">
  //           <h2 className="profile-reports-section-headline">Your Reports</h2>
  //           {Array.isArray(profileData.reports) && profileData.reports.length > 0 ? (
  //             profileData.reports.map((report) => (
  //               <Report key={report.id} report={report} />
  //             ))
  //           ) : (
  //             <p className="profile-reports-section-txt">You have not submitted any reports.</p>
  //           )}
  //         </div>
  //         {/* ################ REPORTS #################*/}

  //         {/* ################ REPORTS HE'S A GUARD OF: #################*/}          
  //         <div className="profile-reports-section">
  //           <h2 className="profile-reports-section-headline">Reports You're Guarding</h2>
  //           {Array.isArray(profileData.IDReportsThatTheUserIsAGuardOf) && profileData.IDReportsThatTheUserIsAGuardOf.length > 0 ? (
  //             profileData.IDReportsThatTheUserIsAGuardOf.map((report) => (
  //               <Report key={report.id} report={report} />
  //             ))
  //           ) : (
  //             <p className="profile-reports-section-txt">You are not guarding any reports.</p>
  //           )}
  //         </div>
  //         {/* ################ REPORTS HE'S A GUARD OF #################*/}


  //       </div>


  //       </div>
  //     ) : (
  //       <p>Loading profile...</p>
  //     )}
  //   </div>
  // );




  // const { userId } = useParams(); // Retrieve the user ID from the URL
  // const [userId, setUserId] = useState(null);
  //const [userId, setUserId] = useState(null);
  //const [error, setError] = useState(null);
  //const navigate = useNavigate();



    // const renderReport = (report) => (
  //   <div className="report-card" key={report.id}>
  //     <h3>{report.title}</h3>
  //     <p>{report.content}</p>
  //     <p>Category: {report.category}</p>
  //     <p>Reliability: {report.reliabilityRate}</p>
  //   </div>
  // );


            {/* <h1 className="headline">Welcome, {profileData.firstName} {profileData.lastName}</h1>
          <p>Country: {profileData.country}</p>
          <p>Email: {profileData.email}</p>
          <img src={profileData.imageURL} alt="Profile" />
          <p>Phone Number: {profileData.phoneNumber}</p>
          <p>Reliability: {profileData.reliabilityRate}</p> */}






///////////////////////////////////

          {/* ########## REPORTS: ##########*/}


         {/* <div className="reports-section">
            <h2>Your Reports</h2>
            {profileData.reports.length > 0 ? (
              profileData.reports.map((report) => renderReport(report))
            ) : (
              <p>You have not submitted any reports.</p>
            )}
          </div> */}


          {/* <div className="reports-section">
          <h2>Your Reports</h2>
          {error ? (
          <p>{error}</p>
          ) : Array.isArray(profileData.reports) && profileData.reports.length > 0 ? (
          reports.map((report) => (
          <Report key={report.id} report={report} /> // Ensure each report has a unique key
          ))
          ) : (
          <p>Loading...</p>
          )}
          </div> */}

          {/* <div className="reports-section">
            <h2>Your Reports</h2>
            {profileData?.reports?.length > 0 ? (
              profileData.reports.map((report) => renderReport(report))
            ) : (
              <p>No reports available yet.</p>
            )}
          </div> */}




          {/* ########## REPORTS HE'S A GUARD OF: ##########*/}


          {/* <div className="guard-reports-section">
            <h2>Reports {profileData.firstName} is a guard of:</h2>
            {profileData?.IDReportsThatTheUserIsAGuardOf?.length > 0 ? (
              profileData.IDReportsThatTheUserIsAGuardOf.map((report) => renderReport(report))
            ) : (
              <p>You are not guarding any reports.</p>
            )}
          </div> */}


////////////////////////////////////////
  // return (
  //   <div className="profile-container">
  //     <h1>{user.firstName} {user.lastName}'s Profile</h1>
  //     <p>Email: {user.email}</p>
  //     <p>Country: {user.country}</p>
  //   </div>
  // );


  // useEffect(() => {
  //   fetch(`http://localhost:8080/profile-page/get-profile?userID=${userData.userId}`)
  //     .then(response => response.json())
  //     .then(data => setUser(data))
  //     .catch(error => console.error('Error fetching user data:', error));
  // }, [userData.userId]);

  // if (!user) {
  //   return <p>Loading...</p>;
  // }