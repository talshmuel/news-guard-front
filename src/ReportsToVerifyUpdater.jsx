import { useEffect, useState, useRef } from "react";
import PresentWindowToVerifyReport from "./PresentWindowToVerifyReport";

const ReportsToVerifyUpdater = () => {
  const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve the logged-in user's data
  let userID = userData ? userData.userId : 1;
  console.log("user id = " + userID)


  const [reportToVerify, setReportToVerify] = useState(null); // State to track the report that needs to be verified
  
  useEffect(() => {
    const intervalId = setInterval(async () => {  // Run this effect on an interval to check for new reports periodically
      console.log("before try: Fetching reports to verify...");
      try {
        const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve the logged-in user's data
        let userID = userData ? userData.userId : 1;
        console.log("$user id = " + userID)
        const response = await fetch(`http://localhost:8080/verification/get-reports-that-guard-need-to-verify?guardID=${userID}`);
        console.log('Response status:', response.status);

        if (response.ok)
        {
          // console.log("ok")
          const data = await response.json(); // data the server gave me
          let dataFromServerArray = Object.values(data); // make it an array

          if (dataFromServerArray.length > 0) // meaning we did get soemthing from the server.
          {
            console.log("dataFromServerArray.length > 0");
            dataFromServerArray.forEach((element, index) => { // prints the array the server gave me
              console.log(`Element ${index}:`, element);
            });
            setReportToVerify(dataFromServerArray[0]); // put the first element to display
            console.log("New report to verify: ", dataFromServerArray[0]);
          }
          else // meaning we didnt get anything from the server
          {
            console.log("dataFromServerArray = 0");
            setReportToVerify(null); // No reports to verify
          }
        }
        else
        {
          console.log("response not ok")
          return;
        }
      } catch (error)
      {
        console.error("Error fetching reports:", error);
      }
    }, 20000); // Check every 20 seconds

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [userID]);

  // Function to close the window
  const handleCloseWindow = () => {
    console.log("handleCloseWindow");
    setReportToVerify(null);
  };

  return (
    <>
      {reportToVerify && (
        <PresentWindowToVerifyReport
        report={reportToVerify}
        userID={userID}
        onClose={handleCloseWindow}
        />
      )}
    </>
  );
};

export default ReportsToVerifyUpdater;



















// const ReportsToVerifyUpdater = () => {
//   const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve the logged-in user's data
//   const userID = userData.userId;
//   console.log('user id=', userID);
  
//   const [reportToVerify, setReportToVerify] = useState(null); // State to track the report that needs to be verified

//   useEffect(() => {
//     console.log("use effect");
//     const getReportsToVerifyFromServer = async () => {
//       console.log("before try");
//       try {
//         console.log("inside try");
//         const response = await fetch(`http://localhost:8080/verification/get-reports-that-guard-need-to-verify?guardID=${userID}`);
//         // const response = await fetch(`http://localhost:8080/verification/get-reports-that-guard-need-to-verify?guardID=${userID}`);


//         console.log('Response status:', response.status);
//         if (response.ok)
//         {
//           const data = await response.json();
//           let dataFromServerArray = Object.values(data); // הופך את דאטה למערך
//           dataFromServerArray.forEach((element, index) => {
//             console.log(`Element ${index}:`, element);
//           });

//           if(dataFromServerArray.length > 0){
//             console.log("dataFromServerArray.length > 0")
//             dataFromServerArray.forEach((element) => {
//               if(!pendingReportsList.includes(element)){
//                 // אם הוא לא נמצא - להוסיף אותו למערך של המחכים בתור
//                 console.log("added new element")
//                 pendingReportsList.push(element);
//                 // Set the report that needs to be verified
//                 setReportToVerify(element);
//               }
//               // להציג את המסך של האישור/דחיה
//               //console.log("DEBUG: before presenting")
//               //PresentWindowToVerifyReport(element);
//               //console.log("DEBUG: after presenting")
//               // if (pendingReportsList.includes(element)) {
//               //   console.log("reports to verify: waiting for answer from guard");
//               // }
//               // else {
//               //   //console.log("reports to verify: it's a new report waiting for approval from guard");
//               //   //console.log("reports to verify: we need to present the report to user");
//               //   pendingReportsList.push(element);
//               //   // לקרוא לפונקציה שמציגה למשתמש בפתאומיות את הריפורטים שהוא צריך לאשר
                
//               //   console.log("Gon")
//               //   PresentWindowToVerifyReport(element);
//               //   console.log("NITzaN")
//               // }
//             });
//               // אם יש משהו במערך:
//               // בודקת האם האיידי של הריפורט קיים אצלי כבר, בליסט הזה:
//               // pendingReportsList
//               // אם הוא קיים:
//               // זה אומר שאנחנו מחכים לתשובה של הגארד
//               // ואם הוא לא קיים:
//               // זה אומר שזה ריפורט חדש ואז צריך להציג את הריפורט זה למשתמש
//               // וגם להוסיף אותו לרשימה של הפנדינג
//               // -->
//               // לקרוא לפונקציה שמציגה למשתמש בפתאומיות את הריפורטים שהוא צריך לאשר
//           }
//           else {
//             console.log("reports to verify: DEBUG- dataFromServerArray.length = 0")
//           }
//           //showReportToVerify(data);
//           //console.log('Fetched reports data:', data);
//           //setReports(data);
//         }
//         else
//         {
//           const errorMessage = await response.text();
//           console.error('Response error:', errorMessage);

//           if (response.status === 404) { // Not Found
//             setError('Reports not found.');
//           } else if (response.status === 500) { // Server Error
//             setError('Server error occurred while fetching reports.');
//           } else {
//             setError(`Error: ${errorMessage}`);
//           }
//         }
//       } catch (error) {
//         console.error('Error occurred during fetching reports:', error);
//         setError('An error occurred while fetching reports. Please try again.');
//       }
//     };

//   // const ReportToVerify = () => {
//   //   getReportsToVerifyFromServer();
//   // };
//   // ReportToVerify(); // Send location immediately when the component mounts

  
//   getReportsToVerifyFromServer();
//   let pendingReportsList = []; // initialization
//   //const intervalId = setInterval(ReportToVerify, 60000); // Send location every minute
//   const intervalId = setInterval(getReportsToVerifyFromServer, 60000);

//   return () => clearInterval(intervalId); // Clean up the interval on component unmount
// }, [userID]);

// // Conditionally render the pop-up
// return (
//   <>
//     {reportToVerify && <PresentWindowToVerifyReport report={reportToVerify} />}
//   </>
// );
// };

// // return null; // This component doesn't render anything
// // };

// export default ReportsToVerifyUpdater;

//******************* VERSOIN 2 *************************** */

// const ReportsToVerifyUpdater = () => {
//   const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve the logged-in user's data
//   const userID = userData?.userId;
//   console.log('user id=', userID);

//   const [reportToVerify, setReportToVerify] = useState(null); // State to track the report that needs to be verified
//   const [pendingReportsList, setPendingReportsList] = useState([]); // List of reports to verify

//   useEffect(() => {
//     const getReportsToVerifyFromServer = async () => {
//       console.log("before try");
//       try {
//         console.log("inside try");
//         const response = await fetch(`http://localhost:8080/verification/get-reports-that-guard-need-to-verify?guardID=${userID}`);
//         console.log('Response status:', response.status);
        
//         if (response.ok) {
//           console.log("response ok")
//           const data = await response.json();
//           const dataFromServerArray = Object.values(data);

//           if (dataFromServerArray.length > 0) {
//             console.log("dataFromServerArray.length > 0");

//             // Check if the new report is different from the current one
//             const newReport = dataFromServerArray[0];
//             if (!pendingReportsList.some(report => report.reportID === newReport.reportID)) {
//               setPendingReportsList([...pendingReportsList, newReport]);
//               console.log("added new element");
//               setReportToVerify(newReport); // Show the new report in the window
//             }
//           } else{
//             console.log("dataFromServerArray = 0")
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching reports:", error);
//       }
//     };

//     if (userID) {
//       console.log("userID != 0")
//       console.log("getReportsToVerifyFromServer()")
//       getReportsToVerifyFromServer();
//     }
//   }, [userID, pendingReportsList]); // Dependency array includes userID and pendingReportsList

//   return (
//     <>
//       {reportToVerify && <PresentWindowToVerifyReport report={reportToVerify} />}
//     </>
//   );
// };

// export default ReportsToVerifyUpdater;













































// function presentPopUpToApproveReport() {
//   console.log("reports to verify: presentPopUpToApproveReport function")
// }



// const ReportsToVerifyUpdater = () => {
//   const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve the logged-in user's data
//   const userID = userData.userId;
//   console.log("ReportsToVerifyUpdater: DEBUG: userID: " + userID);

//   const [pendingReportsList, setPendingReportsList] = useState([]);
//   console.log("DEBUG: pendingReportsList: " + pendingReportsList);
//   const [popupContent, setPopupContent] = useState(null);
//   console.log("DEBUG: popupContent: " + popupContent);
//   const isMounted = useRef(true);
//   console.log("DEBUG: isMounted: " + isMounted);


//   useEffect(() => {
//     const getReportsToVerifyFromServer = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/verification/get-report-that-guard-need-to-verify?guardID=${userID}`);

//         if (response.ok) {
//           const data = await response.json();
//           const dataFromServerArray = Array.isArray(data) ? data : Object.values(data);
//           console.log('Converted to array:', dataFromServerArray);

//           if (dataFromServerArray.length > 0) {
//             dataFromServerArray.forEach((element) => {
//               if (!pendingReportsList.some(report => report.reportID === element.reportID)) {
//                 console.log("it's a new report waiting for approval from guard");
//                 setPendingReportsList(prevReports => [...prevReports, element]);
//                 // Set content for popup
//                 setPopupContent(element);
//               } else {
//                 console.log("waiting for answer from guard");
//               }
//             });
//           } else {
//             console.log("DEBUG: dataFromServerArray.length = 0");
//           }
//         } else {
//           const errorMessage = await response.text();
//           console.error('Response error:', errorMessage);

//           // Handle error cases
//           if (response.status === 404) {
//             console.error('Reports not found.');
//           } else if (response.status === 500) {
//             console.error('Server error occurred while fetching reports.');
//           } else {
//             console.error(`Error: ${errorMessage}`);
//           }
//         }
//       } catch (error) {
//         console.error('Error occurred during fetching reports:', error);
//       }
//     };

//     if (isMounted.current) {
//       getReportsToVerifyFromServer(); // Send request immediately when the component mounts
//     }

//     const intervalId = setInterval(() => {
//       if (isMounted.current) {
//         getReportsToVerifyFromServer(); // Send request every minute
//       }
//     }, 60000);

//     return () => {
//       isMounted.current = false;
//       clearInterval(intervalId); // Clean up the interval on component unmount
//     };
//   }, [userID, pendingReportsList]);

//   // Function to display the popup
//   const presentPopUpToApproveReport = (report) => {
//     // Implement your popup logic here
//     alert(`New report to verify: ${report.reportID}`);
//   };

//   // Call this function when popup content is updated
//   useEffect(() => {
//     if (popupContent) {
//       presentPopUpToApproveReport(popupContent);
//       setPopupContent(null); // Clear popup content after showing
//     }
//   }, [popupContent]);

//   return null; // This component doesn't render anything
// };

// export default ReportsToVerifyUpdater;
