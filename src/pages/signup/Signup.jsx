import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import logo from '../../../public/logo.jpg'
import { useState } from 'react';


function SignupPage() {
  const [locationAccessPermission, setLocationPermission] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  // const [profilePicture, setProfilePicture] = useState(null);
  const [imageURL, setImageURL] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  // gon added this 1/9 12:40
  
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // const handleFileChange = (e) => {
  //   setProfilePicture(e.target.files[0]);
  //   console.log("profile picture")
  // };
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
        //console.log('profile picture uploaded')
        return data.imageUrl; // URL returned from the server
      } else {
        //console.log('profile picture failed')
        throw new Error(data.message || 'Image upload failed');
      }
    } catch (error) {
      //console.log('profile picture ERROR')
      console.error('Error uploading image:', error);
      alert('An error occurred while uploading the image.');
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     // Check if location access permission is granted
    if (!locationAccessPermission) {
      alert("You must approve location access to sign up.");
      return; // Exit the function early if permission is not granted
    }

    // const formData = new FormData(); // Use FormData for file upload
    // formData.append('firstName', firstName);
    // formData.append('lastName', lastName);
    // formData.append('country', country);
    // formData.append('email', email);
    // formData.append('phoneNumber', phoneNumber);
    // formData.append('password', password);
    // formData.append('locationAccessPermission', locationAccessPermission);
    
    // if (profilePicture) {
    //   formData.append('profilePicture', profilePicture); // Append profile picture
    //   console.log("profile pictureeeeee")
    // } else {
    //   formData.append('profilePicture', " ");
    //   console.log("NO profile pictureeeeee")
    // }
    let imageUrl = '';
    if (selectedImage) {
      //("imageURL: ")
      imageUrl = await uploadImage(selectedImage);
      if (!imageUrl) return; // Abort if image upload fails
    }

    const signupData = {
      firstName,
      lastName,
      country,
      email,
      password,
      imageURL: imageUrl,
      phoneNumber,
      locationAccessPermission
    };
    //console.log("Sending signupData:", signupData);

    try {
      const response = await fetch('https://news-guard-c0fjanc7ethue7dn.eastus-01.azurewebsites.net/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: formData,
        body: JSON.stringify(signupData),
      });
console.log("check")
      if (response.ok) {
        //console.log("SIGN UP SUCCESSFULL!");
        navigate('/');
        // Assuming the server returns a JSON object upon successful signup
        //const result = await response.json();
        // Successful signup, navigate to home page or wherever needed
      }
      else
      {
        const errorMessage = await response.text(); // Server sends error message as plain text
        console.error('Error:', errorMessage);
        alert(errorMessage); // Show an alert with the error message

      } 
    } catch (error) {
      console.error('Network error:', error); // Handle network or unexpected errors
      alert('Failed to connect to the server. Please try again.');
    }
  }; 

  const handleLogin = () => {
    localStorage.removeItem('userData'); // Clear user data from localStorage
    window.location.href = '/'; // Redirect to login page
  };

  return (
    <div className="signup-container">
      <img src={logo} alt="NewsGuard Logo" className="signup-logo" />
      <h1 className="signup-title">Sign Up for News Guard!</h1>
      <h2 className="signup-title2">Be the guardian of the truth</h2>
      
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-form-section">
          <h3 className="personaldetails-text">Personal Details:</h3>

          <div className="signup-input-group">
            <label className="signup-input-label">First Name:</label>
              <input 
                type="text" 
                name="firstName" 
                className="signup-input-box"
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
          </div>

          <div className="signup-input-group">
            <label className="signup-input-label">Last Name:</label>
              <input 
                type="text" 
                name="lastName" 
                className="signup-input-box"
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)}
                required
              />
          </div>

          <div className="signup-input-group">
            <label className="signup-input-label">Country:</label>
              <input 
                type="text" 
                name="country" 
                className="signup-input-box"
                value={country} 
                onChange={(e) => setCountry(e.target.value)}
                required
              />
          </div>

          <div className="signup-input-group">
            <label className="signup-input-label">Phone Number:</label>
              <input 
                type="tel" 
                name="phoneNumber" 
                className="signup-input-box"
                value={phoneNumber} 
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
          </div>

          <div className="signup-input-group">
            <label className="signup-input-label">Email:</label>
              <input 
                type="email" 
                name="email" 
                className="signup-input-box"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                required
              />
          </div>

          <div className="signup-input-group">
            <label className="signup-input-label">Password:</label>
            <input 
              type="password"
              name="password"
              className="signup-input-box" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="signup-image-container">
            <label htmlFor="image-upload" className="signup-input-label"
              >Profile Picture:
            </label>
              <div className="signup-image-upload">
                <input
                  className="signup-image-input"
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
          {imageURL && (
            <div className="signup-image-preview">
              <img src={imageURL} alt="Preview"
              className="signup-image-preview-img" />
            </div>
          )}

          <label className="signup-checkbox-label">
            <input 
              className="signup-checkbox-label-input"
              type="checkbox" 
              name="locationAccessPermission"
              checked={locationAccessPermission}
              onChange={() => setLocationPermission(!locationAccessPermission)} 
            />
            <p className="signup-location-permission">Location Permission</p>
          </label>
        </div>

        <button type="submit" className="signup-signup-button">Sign Up</button>
      </form>

      <form className="signup-lower-section">
      <p className="signup-lower-text">Already have an account?</p>
      <Link to="/">
        <button className="signup-login-button" onClick={handleLogin}>Login</button>
      </Link>
      </form>
    </div>
  );
}

export default SignupPage;