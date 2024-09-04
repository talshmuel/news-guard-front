import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

import LocationUpdater from './LocationUpdater'
import LoginPage from './pages/login/Login';
import SignupPage from './pages/signup/Signup';
import HomePage from './pages/home/Home';
import NewReportPage from './pages/newReport/NewReport';
import ProfilePage from './pages/profile/Profile';
import ReportsToVerifyUpdater from './ReportsToVerifyUpdater';
//import NotificationsPage from './pages/notifications/Notifications';
//import VerificationPage from './pages/verification/Verification';

import { 
  createBrowserRouter, 
  RouterProvider, 
} from 'react-router-dom';

const router = createBrowserRouter([
  { path: '/', element: <LoginPage />},
  { path: '/signup', element: <SignupPage />},
  { path: '/home', element: <HomePage />},
  { path: '/profile', element: <ProfilePage />},
  { path: '/new-report', element: <NewReportPage />},
  //{ path: '/notifications', element: <NotificationsPage />},
  //{ path: '/verification', element: <VerificationPage />},
  //{ path: '/settings', element: <SettingsPage />}
]);

// Function to check user login status
// const checkUserLoginStatus = () => {
//   // You can check localStorage, cookies, or some other method to verify the user's login status.
//   const user = localStorage.getItem('user');
//   return user ? true : false;
// };


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) {
      setIsLoggedIn(true); // If userData exists, user is logged in
    } else {
      setIsLoggedIn(false); // Otherwise, user is not logged in
    }
  }, []); // Run once when the component mounts

  // version 1: בלי ההתנייה 
  return ( 
    <div>
      <RouterProvider router={router} />
      <LocationUpdater />
      <ReportsToVerifyUpdater />
    </div>
  );

}


export default App;


  // return (
  //   <div>
  //     {/* Always show the router */}
  //     <RouterProvider router={router} />
  //     {console.log('Is Logged In:', isLoggedIn)}

  //     {/* Conditionally render updaters only when the user is logged in */}
  //     {isLoggedIn && (
  //       <>
  //         <LocationUpdater />
  //         <ReportsToVerifyUpdater />
  //       </>
  //     )}
  //   </div>
  // );
  
  


  // version 2: עם התנייה (לא עובד)
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // useEffect(() => {
  //   // Check if the user is logged in when the component mounts
  //   const loginStatus = checkUserLoginStatus();
  //   setIsLoggedIn(loginStatus);
  // }, []);

  // return (
  //   <div>
  //     <RouterProvider router={router} />
  //     {isLoggedIn && (
  //       <>
  //         <LocationUpdater />
  //         <ReportsToVerifyUpdater />
  //       </>
  //     )}
  //   </div>
  // );
  
  







// function App() {
//   return (
//     <>
//       <h1>News Guard</h1>
//     </>
//   )
// }

// ******************************************************** //
// way 2
// const routeDefinitions = createRoutesFromElements(
//   <Route>
//     <Route path="/" element={<HomePage />} />
//     <Route path="/products" element={<ProductsPage />} />
//   </Route>
// )

// const router = createBrowserRouter(routeDefinitions);
// ******************************************************** //

