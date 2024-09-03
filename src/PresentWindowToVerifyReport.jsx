import React, { useEffect, useState, useRef } from "react";
import './PresentWindowToVerifyReport.css';




function PresentWindowToVerifyReport({report}) {
  const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve the logged-in user's data
  const userID = userData.userId;
  console.log("user id=" + userID)

  const [isVisible, setIsVisible] = useState(true); // Local state to control visibility

  console.log("report to show: " + JSON.stringify(report));
  
  // console.log("reportID: " + report.reportID)
  // console.log("text: " + report.text)
  // console.log("imageURL: " + report.imageURL)
  // console.log("comments: " + report.comments)
  // console.log("reliabilityRate: " + report.reliabilityRate)
  // console.log("reporterID: " + report.reporterID)
  // console.log("reporterFullName: " + report.reporterFullName)
  // console.log("location: " + report.location.x + " " + report.location.y)
  // console.log("timeReported: " + report.timeReported)
  // console.log("countUsersWhoLiked: " + report.countUsersWhoLiked)
  // console.log("idofUsersWhoLiked: " + report.idofUsersWhoLiked)
  // console.log("anonymousReport: " + report.anonymousReport)
  // Function to make PUT request
  // const sendVerificationRequest = (reportId, verification) => {
  //   console.log("DEBUG: verification: " + verification + " reportId: " + reportId);
  //   fetch(`http://localhost:8080/verification/update-guard-verification?reportID=${reportId}&guardID=${userID}&verification=${verification}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then(response =>
  //   {
  //     if (response.ok) {
  //       console.log("OKAY")
  //       return response.text();
  //     }
  //     else
  //     {
  //       console.log("NOT OKAY")
  //       throw new Error("Failed to update guard verification");
  //     }
  //   })
  //   .then(data => {
  //     //console.log("Server response:", data);
  //     setIsVisible(false); // Hide the window after the request is successful
  //   })
  //   .catch(error => {
  //     console.error("Error:", error);
  //   });
  // };

  const sendVerificationRequest = async (reportId, verification) => {
    console.log("sendVerificationRequest")
    try {
      console.log("entering try, verification: " + verification)
      const response = await fetch(`http://localhost:8080/verification/update-guard-verification?reportID=${reportId}&guardID=${userID}&verification=${verification}`,
        {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
        });

      if(response.ok){
        setIsVisible(false); // Hide the window after the request is successful
        // return response.text("setIsVisible=" + isVisible);
      }
      else
      {
        console.log("error")
        throw new Error("Failed to update guard verification");
      }
    } catch (error){
      console.error("Error:", error);
      console.log("ERRORRRRR")
    }
  };


  // Handlers for buttons
  const handleApprovalClick = (reportId) => {
    console.log("Approved report ID: ", reportId);
    sendVerificationRequest(reportId, 1); // 1 for Approval
    setIsVisible(true);
  };

  const handleDenyClick = (reportId) => {
    console.log("Denied report ID: ", reportId);
    sendVerificationRequest(reportId, 2); // 2 for Denial
    setIsVisible(true);
  };

  const handleDontKnowClick = (reportId) => {
    console.log("Don't know report ID: ", reportId);
    sendVerificationRequest(reportId, 3); // 3 for Don't Know
    setIsVisible(true);
  };

  // const handleReplyLaterClick = (reportId) => {
  //   console.log("Reply later report ID: ", reportId);
  //   setIsVisible(false); // Hide the window immediately for "Reply Later"
  // };

  // Don't render the window if it's not visible
  if (!isVisible) {
    return null;
  } else {

    return (
      <div className="present-report-container">
        
        {/* <div className="present-report-header"> */}
          {/* <p className="present-report-details"><strong>Reporter: </strong>{report.anonymous ? 'Anonymous' : report.reporterFullName}</p> */}
          {/* <p className="present-report-details">⭐ Report Reliability: {report.reliabilityRate} ⭐</p> */}
          {/* <p className="present-report-details">Location: {report.location.x}, {report.location.y}</p> */}
          {/* <p className="present-report-details">{new Date(report.timeReported).toLocaleString()}</p> */}
        {/* </div> */}
  
        {/* <div className="present-report-header">
          <div className="present-report-details-left">
            <strong>Reporter: </strong>{report.anonymous ? 'Anonymous' : report.reporterFullName}
          </div>
          <div className="present-report-details-center">
            ⭐ Report Reliability: {report.reliabilityRate} ⭐
          </div>
          <div className="present-report-details-right">
            {new Date(report.timeReported).toLocaleString()}
          </div>
        </div> */}
  
        <div className="present-report-header">
          <div className="present-report-section present-report-details-left">
            <span className="present-report-label">Reporter</span>
            <span className="present-report-value">{report.anonymous ? 'Anonymous' : report.reporterFullName}</span>
          </div>
          <div className="present-report-section present-report-details-center">
            <span className="present-report-label">Reliability</span>
            <span className="present-report-value">{report.reliabilityRate}</span>
          </div>
          <div className="present-report-section present-report-details-right">
            <span className="present-report-label">Time</span>
            <span className="present-report-value">{new Date(report.timeReported).toLocaleString()}</span>
          </div>
        </div>
  
        <div>
          {report.imageURL ? (
            <img
              className="present-report-img"
              src={report.imageURL}
              alt="Report"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          ) : null}
        </div>
  
        <p className="present-report-txt">{report.text}</p>
  
        <div className="present-report-buttons">
          <button className="present-approve-button" onClick={() => handleApprovalClick(report.reportID)}>Approve</button>
          <button className="present-deny-button" onClick={() => handleDenyClick(report.reportID)}>Deny</button>
          <button className="present-dont-know-button" onClick={() => handleDontKnowClick(report.reportID)}>Don't Know</button>
          {/* <button className="present-later-button" onClick={() => handleReplyLaterClick(report.reportID)}>Reply Later</button> */}
        </div>
      </div>
    );
  }

}

export default PresentWindowToVerifyReport;







  // const sendVerificationRequest2 = (reportId, verification) => {
  //   console.log("DEBUG: verification: " + verification + " reportId: " + reportId);
  //   fetch(`http://localhost:8080/verification/update-guard-verification?reportID=${reportId}&guardID=${userID}&verification=${verification}`,
  //     {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   })
  //   .then(response =>
  //   {
  //     if (response.ok) {
  //       console.log("OKAY")
  //       return response.text();
  //     }
  //     else
  //     {
  //       console.log("NOT OKAY")
  //       throw new Error("Failed to update guard verification");
  //     }
  //   })
  //   .then(data => {
  //     //console.log("Server response:", data);
  //     setIsVisible(false); // Hide the window after the request is successful
  //   })
  //   .catch(error => {
  //     console.error("Error:", error);
  //   });
  // };