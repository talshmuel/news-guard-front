import { useEffect } from "react";

const LocationUpdater = () => {
  useEffect(() => {
    const sendLocation = async (latitude, longitude) => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve the logged-in user's data
        let userID;
        if(userData){
          userID = userData.userId;
        } else{
          userID = 1;
        }
        if(userID === 1)
        {
          latitude = 0;
          longitude = 0;
        }
  
        const response = await fetch('https://news-guard-c0fjanc7ethue7dn.eastus-01.azurewebsites.net/location/save-location', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userID,
            latitude,
            longitude,
          }),
        });

        const data = await response.text(); // Handles plain text response
         console.log("user " + userID + " is in location: " + latitude + " " + longitude)
      } catch (error) {
        console.error("Error:", error);
      }
    };

    let lastLatitude, lastLongitude;

    const updateLocation = () => {
      const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve the logged-in user's data
      let userID;
      if(userData){
        userID = userData.userId;
         console.log("userID = " + userID)
      } else{
        userID = 1;
      }

      if (navigator.geolocation) {
         console.log(" IN IF1")
        navigator.geolocation.getCurrentPosition(
          (position) => {
             console.log(" IN IF2")
            const { latitude, longitude } = position.coords;
              lastLatitude = latitude;
              lastLongitude = longitude;
              sendLocation(latitude, longitude);
          },
          (error) => {
             console.log("Error getting location")
            console.error("Error getting location", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
         console.log("location error: Geolocation is not supported by this browser.");
      }
    };

    sendLocation(); // Send location immediately when the component mounts
    const intervalId = setInterval(updateLocation, 5000); // Send location every 5 seconds

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  return null; // This component doesn't render anything
};

export default LocationUpdater;