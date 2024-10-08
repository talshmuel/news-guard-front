import { Link, useNavigate } from 'react-router-dom';
import './NewReport.css';
import logo from '../../../public/logo.jpg'
import React, { useState } from "react";
import NavigationBar from '../Navigation';


function NewReportPage(){
    const [anonymousReport, setAnonymousReport] = useState(false);
    const [imageURL, setImageURL] = useState(''); 
    const [selectedImage, setSelectedImage] = useState(null);
    const [latitude, setLatitude] = useState(''); // location: {x: 0, y: 0}
    const [longitude, setLongitude] = useState('');
    const [text, setText] = useState('');
    const [dateTime] = useState(new Date()); // Current datetime
    
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
        const response = await fetch('https://news-guard-c0fjanc7ethue7dn.eastus-01.azurewebsites.net/report/upload-image', {
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
    console.log("!@#$% " + anonymousReport)
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleSubmit(e, latitude, longitude, anonymousReport);
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

  const handleSubmit = async (e, lat, long, anon) => {
    e.preventDefault();
    if (!reporterID) {
      alert('User not logged in. Please log in to submit a report.');
      return;
    }

    let imageUrl = '';
    if (selectedImage) {
      imageUrl = await uploadImage(selectedImage);
      if (!imageUrl) return; // Abort if image upload fails
    }

    const reportData = {
      text,
      imageURL: imageUrl,
      reporterID,
      anonymousReport: anon,
      dateTime: new Date().toISOString(),
      latitude: lat,
      longitude: long,
    };

    try {
      const response = await fetch('https://news-guard-c0fjanc7ethue7dn.eastus-01.azurewebsites.net/report/add-new-report', {
        method: 'POST',
        headers:
        {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });

      let responseBody;
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json'))
      {
        responseBody = await response.json();
        console.log("responseBody: " + responseBody)
      } else {
        responseBody = await response.text();
      }
      console.log("Response received:", responseBody); // Log the response

      if (response.ok) {
        console.log('Report successfully submitted:', responseBody);
        navigate('/home');
      } else {
        console.error('Failed to submit report:', responseBody);
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
      console.error('Error during report submission:', error);
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

    {imageURL && (
      <div className="new-report-image-preview">
        <img src={imageURL} alt="Preview" />
      </div>
    )}

    <div className="new-report-anon-container">
      <label>
        <input
          className="new-report-anon"
          type="checkbox"
          checked={anonymousReport}
          onChange={() => setAnonymousReport(!anonymousReport)}
          />
        Submit Anonymously
      </label>
    </div>

    <div className="new-report-button-container">
      <button type="submit" className="new-report-submit-button">Submit</button>
      <button type="button" className="new-report-cancel-button" onClick={handleCancel}>Cancel</button>
    </div>

    </form>
    </div>
  );
}

export default NewReportPage;