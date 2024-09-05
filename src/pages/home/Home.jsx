import { Link, useNavigate } from 'react-router-dom';
import './Home.css';
import logo from '../../../public/logo.jpg';
import Report from './Report'; // Import the Report component
import { useEffect, useState } from 'react';


/*
      לייק זה פונקציית פוט
      <PUT></PUT>
      מקבלת:
      report id - ועל איזה ריפורט
      user id - מי עשה לייק
////////////////////////////////////////////////////
      comments:
      JSON body 
      commentsDTO

      private final int reportID;
      private final String text;
      private final int writerUserID;
      private final boolean isAGuardComment;


      -present how many comments, and show the comments section.
      -add button "comment"
*/

function HomePage(){
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve the logged-in user's data
  // console.log('user id: ', userData.userId);

  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);

  // console.log("HOME: new Date(): " + new Date())
  // console.log("HOME: new Date().getDate.toString: " + new Date().getDate.toString)
  // console.log("HOME: new Date().getTime: " + new Date().getTime)
  // console.log("HOME: currentDateTime.toLocaleDateString(): " + currentDateTime.toLocaleDateString())
  // console.log("HOME: currentDateTime.toLocaleTimeString(): " + currentDateTime.toLocaleTimeString())
  // console.log("==========================================")

////
  // const [currentDateTime, setCurrentDateTime] = useState(new Date());
  // useEffect(() => {
  //   // Update the current date and time every second
  //   const interval = setInterval(() => {
  //     setCurrentDateTime(new Date());
  //   }, 1000); // Update every second

  //   return () => clearInterval(interval); // Cleanup interval on component unmount
  // }, []);


  // const [currentDateTime, setCurrentDateTime] = useState(new Date());
  // useEffect(() => {
  //   setCurrentDateTime(new Date());
  // }, []);
  // console.log("HOME: ", currentDateTime.toLocaleDateString(), currentDateTime.toLocaleTimeString());
  // console.log("==========================================");
  // //////
  useEffect(() => {
    const fetchReports = async () => {
      try {
        //console.log('Fetching reports...');
        const response = await fetch('http://localhost:8080/home-page/get-last-twenty-reports');
        //console.log('Response status:', response.status);

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
    // Clear user data from localStorage
    localStorage.removeItem('userData');
  
    // Redirect to login page
    window.location.href = '/'; // Assuming '/' is the login route
  };
  

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
        {error ? (
      <p>{error}</p>
        ) : Array.isArray(reports) && reports.length > 0 ? (
        reports.map((report) => (
        <Report key={report.reportID} report={report} /> // Ensure each report has a unique key
         ))
        ) : (
      <p className="home-loading">Loading...</p>
      )}
    </div>

  </div>
  )
}

export default HomePage;












  // useEffect(() => {
  //   fetch('http://localhost:8080/home-page/get-last-twenty-reports') //reports?limit=20') // לשאול את ניצן מה השם של האנדפוינט
  //     .then(response => response.json())
  //     .then(data => setReports(data))
  //     .catch(error => console.error('Error fetching reports:', error));
  // }, []);



    {/* <header className="home-navbar">
    <img src={logo} alt="News Guard Logo" className="home-logo" />
      <ul className="home-tab-list">
        <li>
          <Link to="/home">
            <button className="home-button">Home</button>
          </Link>
        </li>
        <li>
        <Link to="/profile">
            <button className="home-button">Profile</button>
          </Link>
        </li>
        <li>
          <Link to="/new-report">
            <button className="home-button">Add New Report</button>
          </Link>
        </li>
        <li>
          <Link to="/">
            <button className="home-button">Log Out :(</button>
          </Link>
        </li>
      </ul>
    </header> */}




/*
<div className="home-container2">
      <header className="navbar2">
        <ul className="tab-list2">
          <li>
              <Link to="/home">
                <button className="home-button">Home</button>
              </Link>
          </li>
          <li>
              <Link to="/profile">
                <button className="home-button">Profile</button>
              </Link>
          </li>
          <li>
              <Link to="/newReport">
                <button className="home-button">Add New Report</button>
              </Link>
          </li>
          <li>
              <Link to="/settings">
                <button className="home-button">Settings</button>
              </Link>
          </li>
          <li>
              <Link to="/">
                <button className="logout-button">Log Out :(</button>
              </Link>
          </li>
        </ul>
      </header>
    </div>
     */





















/*
<TabButton>Home</TabButton>
          <TabButton>New Report</TabButton>
          <TabButton>Profile</TabButton>
          <TabButton>Notifications</TabButton>
          <TabButton>Settings</TabButton>
          <TabButton>Log Out</TabButton>
           */




// function HomePage2() {
//     return (
//       <div className="home-container">
//         <header className="navbar">
//           <img src={logo} alt="NewsGuard Logo" className="logo" />
//           <nav className='buttons'>
//           <Link to="/home">
//             <button className="nav-button">🏠</button>
//             </Link>
//           <Link to="/new-report">
//             <button className="nav-button">➕</button>
//           </Link>
//           <Link to="/profile">
//             <button className="nav-button">👤</button>
//           </Link>
//           <Link to="/notifications">
//             <button className="nav-button">🔔</button>
//           </Link>
//           <Link to="/settings">
//             <button className="nav-button">⚙️</button>
//           </Link>
//           <Link to="/">
//             <button className="nav-button">Logout</button>
//           </Link>
//           </nav>
//         </header>
//         <div className="main-content">
//           <div className="controls">
//             <label className="control-label">
//               Sort by:
//               <select className="control-select">
//                 <option value="date">Date</option>
//                 <option value="popularity">Popularity</option>
//                 <option value="reliability">Reliability</option>
//               </select>
//             </label>
//             <label className="control-label">
//               Filter by:
//               <select className="control-select">
//                 <option value="all">All</option>
//                 <option value="sport">Sport</option>
//                 <option value="entertainment">Entertainment</option>
//                 <option value="lifestyle">Lifestyle</option>
//               </select>
//             </label>
//           </div>
//           <div className="report-feed">
//             <div className="report">
//               <div className="report-tags">
//                 <span className="tag">#sport</span>
//                 <span className="tag">#entertainment</span>
//                 <span className="tag">#lifestyle</span>
//               </div>
//               <div className="report-user">
//                 <span><strong>User Name:</strong> John Doe | <strong>Reliability Scale:</strong> 4.2<i className="star">★</i></span>
//               </div>
//               <div className="report-content">
//                 <img src={example} alt="Report Example" className="example" />
//               </div>
//               <div className="report-footer">
//                 <div className="report-interactions">
//                   <button className="interaction-button">Likes</button>
//                   <button className="interaction-button">Comments</button>
//                   <button className="interaction-button">Guardian Comments</button>
//                 </div>
//                 <div className="report-reliability">
//                   <span>3.7 <i className="star">★</i></span>
//                 </div>
//               </div>
//             </div>
//             {/* More reports can be added here */}
//           </div>
//         </div>
//       </div>
//     );
//   }



/*                <img src="https://via.placeholder.com/150" alt="Example" className="report-image"/> */






// function HomePage() {
//     return (
//         <div className="home-container">
//             <header className="top-bar">
//                 <img src={logo} alt="NewsGuard Logo" className="logo" />
//                 <nav className="nav-buttons">
//                     <Link to="/home" className="nav-button">Home</Link>
//                     <Link to="/profile" className="nav-button">Profile</Link>
//                     <Link to="/notifications" className="nav-button">Notifications</Link>
//                     <Link to="/settings" className="nav-button">Settings</Link>
//                     <Link to="/logout" className="nav-button">Logout</Link>
//                 </nav>
//             </header>
//             <main className="main-content">
//                 <div className="controls">
//                     <label>
//                         Sort by:
//                         <select className="control-select">
//                             <option value="date">Date</option>
//                             <option value="relevance">Relevance</option>
//                         </select>
//                     </label>
//                     <label>
//                         Filter by:
//                         <select className="control-select">
//                             <option value="all">All</option>
//                             <option value="favorites">Favorites</option>
//                             <option value="recent">Recent</option>
//                         </select>
//                     </label>
//                 </div>
//                 <div className="feed">
//                     <div className="report">Report 1</div>
//                     <div className="report">Report 2</div>
//                     <div className="report">Report 3</div>
//                     {/* Add more report items as needed */}
//                 </div>
//             </main>
//         </div>
//     );
// }

