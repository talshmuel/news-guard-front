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
import AboutPage from './pages/about/About';
import ReportsToVerifyUpdater from './ReportsToVerifyUpdater';

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
  { path: '/about', element: <AboutPage />},
]);


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

  return ( 
    <div>
      <RouterProvider router={router} />
      <LocationUpdater />
      <ReportsToVerifyUpdater />
    </div>
  );
}

export default App;