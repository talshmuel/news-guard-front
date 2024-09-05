import { useEffect } from "react";

// console.log("location updater 1")

const LocationUpdater = () => {
  // console.log("location updater 2")
  // const globalUserId = JSON.parse(localStorage.getItem('userIdForLocation'));


  
  // let userID = userData ? globalUserId : 1;
  // console.log("user id = " + userID)




  useEffect(() => {
    // console.log("inside use effect")
    const sendLocation = async (latitude, longitude) => {

      // console.log("before try")

      
      try {
        const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve the logged-in user's data
        let userID;
        if(userData){
          userID = userData.userId;
          // console.log("userID = " + userID)
        } else{
          userID = 1;
          // console.log("userID = " + userID)
        }

        if(userID === 1)
        {
          latitude = 0;
          longitude = 0;
        }
  
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
        // console.log("user " + userID + " is in location: " + latitude + " " + longitude)
      } catch (error) {
        
        //console.log("Location: ERRORRRR")
        console.error("Error:", error);
      }
    };



    let lastLatitude, lastLongitude;

    const updateLocation = () => {
      const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve the logged-in user's data
      let userID;
      if(userData){
        userID = userData.userId;
        // console.log("userID = " + userID)
      } else{
        userID = 1;
        // console.log("userID = " + userID)
      }

      // console.log("update location")
      if (navigator.geolocation) {
        // console.log(" IN IF1")
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // console.log(" IN IF2")
            const { latitude, longitude } = position.coords;
            if (latitude !== lastLatitude || longitude !== lastLongitude) {
              // console.log(" IN IF3")
              lastLatitude = latitude;
              lastLongitude = longitude;
              // console.log("lat and long: " + latitude + longitude)
              sendLocation(latitude, longitude);
            }
            // console.log("IM OUT")
          },
          (error) => {
            // console.log("Error getting location")
            console.error("Error getting location", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
        // console.log("location error: Geolocation is not supported by this browser.");
      }
    };

    updateLocation(); // Send location immediately when the component mounts
    const intervalId = setInterval(updateLocation, 5000); // Send location every 5 seconds

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
