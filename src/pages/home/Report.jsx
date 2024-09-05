import React, { useState, useEffect } from 'react';
import './Report.css';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import logo from '../../../public/logo.jpg';

function Report({ report }) {
  const {
    reportID = 0,
    text,
    imageURL,
    // IDOfUsersWhoLiked = [],
    idofUsersWhoLiked = [],
    countUsersWhoLiked, 
    comments: initialComments = [],
    reliabilityRate = 0,
    reporterID = 'Unknown',
    reporterFullName,
    anonymousReport, // = false,
    location = 'Unknown', 
    timeReported, // = new Date().toISOString(), // Default to the current time
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
      const response = await fetch(`http://localhost:8080/report/like-or-unlike?reportID=${report.reportID}&userID=${userData.userId}`, {
        method: 'PUT',
      });

      if (response.ok) {
        const result = await response.text();
        // Toggle the like (increment or decrement)
        setLikesNumber((prevLikes) => prevLikes + (isLiked ? -1 : 1));
        setIsLiked(!isLiked); // Toggle the liked status
      }
    } catch (error) {
      console.error('Error while liking/unliking the report:', error);
    }
  };
  
  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return; // Avoid empty comments
    try {
        const response = await fetch('http://localhost:8080/report/add-comment', {
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
          <span>The report is still in the calculating process</span>
          <div>
            {Array.from({ length: 5 }, (_, i) => (
              <FaRegStar key={i + 1} />
            ))}
          </div>
        </div>
      );
    }


    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(i <= reliabilityRate ? <FaStar key={i} /> : <FaRegStar key={i} />);
    }
    return stars;
  };

  // console.log(text + ": " + anonymousReport)
  // console.log(text + "!!!!!!!!: " + report.isAnonymousReport)


  return (
    <div className="report-container">
      <div className="report-header">
        <p className="report-reporter-details"><strong>Reporter: </strong> {anonymousReport ? 'Anonymous' : reporterFullName}</p>
        <div className="report-reliability">Report Reliability: {renderStars()}</div>
        {/* <p className="report-reliability">⭐ Report Reliability: {report.reliabilityRate} ⭐</p> */}
        {/* <p className="report-reliability">Location: {report.location.x} , {report.location.y}</p> */}
        {/* <p className="report-details"><strong>Reporter Reliability: </strong> {reliabilityRate.toFixed(1)} ⭐</p> */}
        <p className="report-time-details">{formatDateTime(timeReported)}</p>
        {/* <p className="report-time-details"><strong>Reported at: </strong> {formatDateTime(timeReported)}</p> */}
      </div>

      {/* {report.imageURL && <img src={report.imageURL} alt="Image" />} */}
      {/* {report.imageURL && <img src={imageURL} alt="Image" />} */}
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

        {/* Left side: Like button and number of likes */}
        <div className="report-left">
          <button className="report-like-button" onClick={handleLikeClick}>
            {/* {isLiked ? 'Unlike' : 'Like'} */}
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
                {/* {comment.text} */}
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













        {/* Modal for comments */}
        {/* {areCommentsVisible && (
          <div className="comments-modal">
            <div className="comments-modal-content">
              <span className="close-comments-modal" onClick={toggleCommentsVisibility}>&times;</span>
                <h2>Comments</h2>
                  <ul className="comment-list">
                    {comments.map((comment, index) => (
                      <li className="comment-item" key={index}>
                      {comment.text}
                      </li>
                    ))}
                </ul>
            </div>
          </div>
        )} */}


          {/* <div className={`comments-container ${areCommentsVisible ? 'visible' : 'hidden'}`}>
            {comments.map((comment, index) => (
              <div className="comment-item" key={index}>
                {comment.text}
              </div>
            ))}
          </div>
          </div> */}
        


        {/* Right side: Comments section */}
        {/* <div className="report-comment-section">
        <span className="report-comment-label">Comments: {comments.length}</span>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className="comment-input"
        />
        <button className="submit-comment-button" onClick={handleCommentSubmit}>Submit</button>

        <button className="toggle-comments-button" onClick={toggleCommentsVisibility}>
          {areCommentsVisible ? 'Hide Comments' : 'Show Comments'}
        </button>

        {areCommentsVisible && (
          <div className="comments-window">
            <ul className="comment-list">
              {comments.map((comment, index) => (
                <li key={index}>{comment.text}</li>
              ))}
            </ul>
          </div>
        )}
      </div> */}

  


















  // return (
  //   <div className="report-container">
  //     <div className="report-header">
  //       <p><strong>Reporter: </strong> {isAnonymousReport ? 'Anonymous' : reporterFullName}</p>
  //       <p><strong>Reliability: </strong> {reliabilityRate.toFixed(1)} ⭐</p>
  //       <p><strong>Reported at: </strong> {new Date(timeReported).toLocaleString()}</p>
  //     </div>
  //     <div className="report-body">
  //       <p>{text}</p>
  //       {imageURL && <img src={imageURL} alt="Report Visual" />}
  //     </div>
  //     <div className="report-footer">
  //       <p><strong>Likes: </strong> {IDOfUsersWhoLiked.length}</p>
  //       <p><strong>  Comments: </strong> {comments.length}</p>
  //       <p><strong>  Guardians: </strong> {guardsID.length}</p>
  //     </div>
  //   </div>
  // );


  
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
