import { Link, useNavigate } from 'react-router-dom';
import './NewReport.css';
import logo from '../../../public/logo.jpg'
import React, { useState } from "react";

function NewReportPage(){
    const [anonymousReport, setAnonymousReport] = useState(false); // anonymousReport : false
    const [imageURL, setImageURL] = useState(''); 
    const [selectedImage, setSelectedImage] = useState(null);
    const [latitude, setLatitude] = useState(''); // location: {x: 0, y: 0}
    const [longitude, setLongitude] = useState('');
    const [text, setText] = useState('');
    const [dateTime] = useState(new Date()); // Current datetime
    // const [dateTime, setDateTime] = useState(''); // Current datetime

    
    const navigate = useNavigate();
    
    const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve user ID from local storage
    const reporterID = userData ? userData.userId : null;

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageURL(reader.result); // Display preview
        };
        setSelectedImage(file); // Store the file
        reader.readAsDataURL(file);
      }
    };

    const uploadImage = async (file) => {
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const response = await fetch('http://localhost:8080/report/upload-image', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (response.ok) {
          return data.imageUrl; // URL returned from the server
        } else {
          throw new Error(data.message || 'Image upload failed');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('An error occurred while uploading the image.');
        return null;
      }
    };


  const handleLocationAndSubmit = (e) => {
    e.preventDefault();
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          //setLatitude(latitude);
          //setLongitude(longitude);
          handleSubmit(e, latitude, longitude);
        },
        (error) => {
          console.error("Error getting location", error);
          alert("Error retrieving location. Make sure location services are enabled.");
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      alert("Geolocation is not supported by this browser.");
    }
  };


  const handleSubmit = async (e, lat, long) => {
        e.preventDefault();
        if (!reporterID) {
          alert('User not logged in. Please log in to submit a report.');
          return;
        } else {
            //console.log('User is logged in! :)))');
        }
        let imageUrl = '';
        if (selectedImage) {
            imageUrl = await uploadImage(selectedImage);
            if (!imageUrl) return; // Abort if image upload fails
        }

        // console.log("NEW REPORT: new Date(): " + new Date())
        // console.log("NEW REPORT: month: " + dateTime.getMonth)
        // console.log("NEW REPORT: year: " + dateTime.getFullYear)
        // console.log("NEW REPORT: hours: " + dateTime.getHours)
        // console.log("NEW REPORT: minutes: " + dateTime.getMinutes)
        // console.log("NEW REPORT: seconds" + dateTime.getSeconds)
        // const now = new Date();
        // const day = String(now.getDate()).padStart(2, '0'); // Add leading 0 if necessary
        // const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
        // const year = now.getFullYear();
        // const hours = String(now.getHours()).padStart(2, '0'); // 24-hour format
        // const minutes = String(now.getMinutes()).padStart(2, '0');
        // const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
        // console.log("NEW REPORT: " + formattedDate);
        
        const reportData = {
          text,
          imageURL: imageUrl,
          reporterID,
          anonymousReport,
          // dateTime: new Date(),
          dateTime: new Date().toISOString(),
          // dateTime: formattedDate,
          // timeReported: formattedDate,
          // dateTime: new LocalDateTime().toISOString(),
          // dateTime: "iftach ramon hamelech",
          // dateTime: formatDateToISOWithoutMilliseconds(new Date()),
          latitude: lat,
          longitude: long,
        };
        // console.log("Sending reportData:", reportData);

        
    
        try {
          const response = await fetch('http://localhost:8080/report/add-new-report', {
            method: 'POST',
            headers:
            {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(reportData),
          });

        // Check if the response is JSON
        let responseBody;
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json'))
        {
            responseBody = await response.json();
        } else {
            responseBody = await response.text();
        }

        if (response.ok) {
            //console.log('NEW REPORT: Report successful:' + responseBody + "time: " + dateTime);
            navigate('/home');
          } else {
            //console.log('New Report: Report failed');
            console.error('New Report: Report failed:', responseBody);
            if (response.status === 401) { // Unauthorized
              alert('401 Unauthorized');
            } else if (response.status === 404) { // Not Found
              alert('404 Not Found');
            } else if (response.status === 400) { // Bad Request
              alert('400 Bad Request');
            } else {
              alert(`Report posting failed: ${responseBody}`);
            }
          }
        } catch (error) {
          console.error('New Report: Error occurred during posting:', error);
          //console.log("New Report: REPORT ERROR!");
          alert('An error occurred during posting. Please try again.');
        }
      };
      
      // Handle cancel button click
      const handleCancel = () => {
        navigate('/home'); // Redirect to home page
      };

      // Function to format Date to yyyy-MM-ddTHH:mm:ss
      function formatDateToISOWithoutMilliseconds(date) {
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'UTC',
        };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const [{ value: month }, , { value: day }, , { value: year }] = formatter.formatToParts(date);
        const [{ value: hour }, , { value: minute }, , { value: second }] = formatter.formatToParts(new Date(date.getTime() - date.getTimezoneOffset() * 60000));

        return `${year}-${month}-${day}T${hour}:${minute}:${second}`;
      }


      return (
        <div className="new-report-container">
          <h1 className="new-report-headline">Create New Report</h1>
          <form onSubmit={handleLocationAndSubmit}>

        {/* Text Area */}
        <div className="new-report-text-container">
          <label htmlFor="text" className="new-report-text-label">Report Text:</label>
            <textarea
              className="new-report-text-input"
              id="text"
              value={text}
              placeholder="Write Your Text Here!"
              onChange={(e) => setText(e.target.value)}
              required
              />
        </div>        

        {/* Image Upload */}
        <div className="new-report-image-container">
          <label htmlFor="image-upload"
          className="new-report-image-label">Upload Image:</label>
            <div className="new-report-image-upload">
              <input
                className="new-report-image-input"
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
          </div>

        {/* Image Preview */}
        {imageURL && (
          <div className="new-report-image-preview">
            <img src={imageURL} alt="Preview" />
          </div>
        )}

        {/* Anonymous Report Option */}
        <div className="new-report-anon-container">
          <label>
            <input
              className="new-report-anon"
              type="checkbox"
              checked={anonymousReport}
              onChange={() => setIsAnonymousReport(!anonymousReport)}
              />
            Submit Anonymously
          </label>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="new-report-button-container">
          <button type="submit" className="new-report-submit-button">Submit</button>
          <button type="button" className="new-report-cancel-button" onClick={handleCancel}>Cancel</button>
        </div>

         {/* Submit and Cancel Buttons */}
         {/* <div className="new-report-button-container"> */}
            {/* <button type="submit" className="new-report-submit-button">Submit</button> */}
            {/* <button type="submit" className="new-report-submit-button" onSubmit={handleLocationAndSubmit}>Submit</button> */}
            {/* <button type="button" className="new-report-cancel-button" onClick={handleCancel}>Cancel</button> */}
         {/* </div> */}

        </form>
        </div>
      );
}

export default NewReportPage;

//const [dateTime] = useState(new Date().toISOString()); // Current datetime
//const [dateTime] = useState(new Date().toLocaleString('en-US', { hour12: false })); // Local date and time


// location:
// if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       const { latitude, longitude } = position.coords;
//       setLatitude(latitude)
//       setLongitude(longitude)
//       console.log("new report1: latitude=" + latitude + ", longitude=" + longitude)
//     },
//     (error) => {
//       console.log("new report: Error getting location")
//       console.error("new report: Error getting location", error);
//     }
//   );
// } else {
//   console.error("new report: Geolocation is not supported by this browser.");
//   console.log("new report: Geolocation is not supported by this browser.");
// }
// console.log("new report2: latitude=" + latitude + ", longitude=" + longitude)






/* TEXT */
        {/* TEXT AREA 2 */}
          {/* <div>
          <label htmlFor="new-report-text2"
          className="new-report-text2">Report Text:</label>
          <textarea
            className="new-report-input-text2"
            id="new-report-text2"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
          </div> */}



/* IMAGE */

        {/* IMAGE AREA */}
        {/* <div>
          <label htmlFor="image-upload"
          className="new-report-img">Upload Image:</label>
          <input
            className="new-report-input-img"
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div> */}




/* ANONYMOUS POST */

        {/* ANONYMOUS REPORT AREA */}
        // <div>
        //   <label>
        //     <input
        //     className="new-report-anon"
        //     type="checkbox"
        //     checked={isAnonymousReport}
        //     onChange={() => setIsAnonymousReport(!isAnonymousReport)}
        //     />
        //     Submit Anonymously
        //   </label>
        // </div>




/* LOCATION */

            {/* <label>
              Latitude:
              <input
                type="text"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </label>
            <label>
              Longitude:
              <input
                type="text"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </label> */}