import { useEffect } from "react";

const LocationUpdater = () => {
  const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve the logged-in user's data
  const userID = userData.userId;

  useEffect(() => {
    const sendLocation = async (latitude, longitude) => {
      // const dateTime = new Date();
      try {
        const response = await fetch('http://localhost:8080/location/save-location', {
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
        //console.log("Location data sent:", data);
        //console.log("user " + userID + " is in location: " + latitude + " " + longitude)
      } catch (error) {
        
        //console.log("Location: ERRORRRR")
        console.error("Error:", error);
      }
    };

    let lastLatitude, lastLongitude;

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            if (latitude !== lastLatitude || longitude !== lastLongitude) {
              lastLatitude = latitude;
              lastLongitude = longitude;
              sendLocation(latitude, longitude);
            }
          },
          (error) => {
            //console.log("Error getting location")
            console.error("Error getting location", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        //console.log("location error: Geolocation is not supported by this browser.");
      }
    };

    updateLocation(); // Send location immediately when the component mounts
    const intervalId = setInterval(updateLocation, 60000); // Send location every minute

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, []);

  return null; // This component doesn't render anything
};

export default LocationUpdater;











// old version:

// const LocationUpdater = () => {
//   const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve the logged-in user's data
//   const userID = userData.userId

//   useEffect(() => {
//     const sendLocation = (latitude, longitude) => {
//         const dateTime = new Date();
//         fetch('http://localhost:8080/location/save-location', {
//             method: 'POST',
//             headers:
//             {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 userID,       
//                 dateTime,     
//                 latitude,
//                 longitude
//               }),
//         })
//         .then((response) => response.text()) // Handles plain text response
//         .then((data) => {
//           console.log("Location data sent:", data);
//         })
//         .catch((error) => {
//           console.error("Error:", error);
//         });
//     };

//     let lastLatitude, lastLongitude;

//     const updateLocation = () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const { latitude, longitude } = position.coords;
//             if (latitude !== lastLatitude || longitude !== lastLongitude) {
//               lastLatitude = latitude;
//               lastLongitude = longitude;
//               sendLocation(latitude, longitude);
//               //console.log("Location just if changed: ", latitude, longitude);
//             }
//             //console.log("Location: ", latitude, longitude);
//           },
//           (error) => {
//             console.error("Error getting location", error);
//           }
//         );
//       } else {
//         console.error("Geolocation is not supported by this browser.");
//       }
//     };

//     updateLocation(); // Send location immediately when the component mounts
//     const intervalId = setInterval(updateLocation, 60000); // Send location every minute

//     return () => clearInterval(intervalId); // Clean up the interval on component unmount
//   }, []);

//   return null; // This component doesn't render anything
// };

// export default LocationUpdater;
