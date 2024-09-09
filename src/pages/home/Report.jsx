import React, { useState, useEffect } from 'react';
import './Report.css';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../../public/logo.jpg';

function Report({ report }) {
  const {
    reportID = 0, // reportID
    text, // text
    imageURL, // imageURL
    idofUsersWhoLiked = [], // IDOfUsersWhoLiked
    comments: initialComments = [], // comments
    reliabilityRate = 0, // reliabilityRate
    reporterID = 'Unknown', // reporterID
    reporterFullName, // reporterFullName
    anonymousReport, // anonymousReport
    location = 'Unknown', // location
    timeReported, // timeReported // = new Date().toISOString(), // Default to the current time
    countUsersWhoLiked, // countUsersWhoLiked
    reporterReliabilityRate,
  } = report;

  const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve the logged-in user's data

  // State for likes and comments
  const [areCommentsVisible, setAreCommentsVisible] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState(initialComments);
  const [isLiked, setIsLiked] = useState(idofUsersWhoLiked.includes(userData.userId));
  const [likesNumber, setLikesNumber] = useState(countUsersWhoLiked);

  const toggleCommentsVisibility = () => {
    setAreCommentsVisible(!areCommentsVisible);
  };

  const handleLikeClick = async () => {
    try {
      const response = await fetch(`https://news-guard-c0fjanc7ethue7dn.eastus-01.azurewebsites.net/report/like-or-unlike?reportID=${report.reportID}&userID=${userData.userId}`, {
        method: 'PUT',
      });

      if (response.ok) {
        const result = await response.text();
        setLikesNumber((prevLikes) => prevLikes + (isLiked ? -1 : 1)); // Toggle the like (increment or decrement)
        setIsLiked(!isLiked); // Toggle the liked status
      }
    } catch (error) {
      console.error('Error while liking/unliking the report:', error);
    }
  };
  
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return; // Avoid empty comments
    try {//check2
        const response = await fetch('https://news-guard-c0fjanc7ethue7dn.eastus-01.azurewebsites.net/report/add-comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reportID: reportID,
          text: newComment,
          commenterFullName: "",
          commenterUserID: userData.userId, // המגיב הוא מי שמחובר כרגע
          isAGuardComment: false, // TODO
        }),
      });

      setNewComment(''); // Clear the input field

      if (response.ok) {
        const result = await response.text();
        // Add the new comment to the list of comments
        setComments([...comments, 
          { text: newComment, commenterFullName: userData.userFullName}
        ]);
        setNewComment(''); // Clear the input field
      }
      else
      {
        console.error('Failed to add comment:', await response.text());
        setNewComment(''); // Clear the input field
      }
    } catch (error) {
      console.error('Error while adding comment:', error);
    }
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return 'Unknown time';
    const date = new Date(dateTime);
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
    // Use en-GB or any suitable locale
    return date.toLocaleString('en-GB', options).replace(',', '');
  };
  
  const handleImageError = (e) => {
    //e.target.src = 'path/to/placeholder-image.jpg'; // Replace with the path to a placeholder image
  };

  
  const renderStars = () => {
    if (reliabilityRate === -1) {
      return (
        <div>
          <span className="report-italic" style={{ fontStyle: 'italic' }}>Reliability calculation in progress.</span>
        </div>
      );
    }
    else if(reliabilityRate === -2){ // style={{ fontStyle: 'italic' }}
      return (
        <div>
          <span className="report-italic" style={{ fontStyle: 'italic' }}>Not enough info for this report.</span>
        </div>
      );
    }
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= reliabilityRate ? <FaStar key={i} /> : <FaRegStar key={i} />);
    }
    return stars;
  };

  const reporterStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= reporterReliabilityRate ? <FaStar key={i} /> : <FaRegStar key={i} />);
    }
    return stars;
  };


  return (
    <div className="report-container">

    <div className="report-header">
      <div className="report-header-item">
        <div className="report-reporter-info">
          <div className="report-reporter-details">
            <strong>Reporter: </strong>
          <p className="report-reporter-details">
              {anonymousReport ? 'Anonymous' : reporterFullName} <i className="fa-solid fa-star"></i> {report.reporterReliabilityRate}
          </p>
          </div>
          <div className="report-reliability">
            <div className="report-reliability-stars">
            </div>
          </div>
        </div>
      </div>

      <div className="report-header-item">
        <span className="report-reliability-label"><strong>Report Reliability: </strong>{renderStars()} {(reliabilityRate!==-1 && reliabilityRate!==-2) ? reliabilityRate.toFixed(1) : ""}</span>
      </div>

      <p className="report-time-details">{formatDateTime(timeReported)}</p>
    </div>

      <div>
        {imageURL ? (
          <img
            className="report-img"
            src={imageURL}
            alt="Report"
            style={{ maxWidth: '100%', height: 'auto' }}
            onError={handleImageError} // Handle image loading errors
          />
        ) : (
          <p></p>
        )}
      </div>

      <p className="report-content">{text}</p>

      <div className="report-footer">
        <div className="report-left">
          <button className="report-like-button" onClick={handleLikeClick}>
            <i className={isLiked ? 'fas fa-thumbs-down' : 'fas fa-thumbs-up'}></i>
          </button>
          <span className="report-like-label">{likesNumber}</span>
        </div>
        <div className="report-right">
          <span className="report-comment-section"></span>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment"
            />
            <button className="report-comment-submit" onClick={handleCommentSubmit}>Submit</button>
          <button className="toggle-comments-button" onClick={toggleCommentsVisibility}>
            {areCommentsVisible ? `Hide Comments (${comments.length})` : `Show Comments (${comments.length})`}
          </button>
          </div>
        </div>

        {areCommentsVisible && (
          <div className="comments-section">
            <ul className="comment-list">
            {comments.map((comment, index) => (
              <li className="comment-item" key={index}>
                {comment.commenterFullName}: {comment.text}
              </li>
            ))}
          </ul>
          </div>
        )}
    </div> // report-container
  );
}

export default Report;