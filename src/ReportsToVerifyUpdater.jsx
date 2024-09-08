import { useEffect, useState, useRef } from "react";
import PresentWindowToVerifyReport from "./PresentWindowToVerifyReport";

const ReportsToVerifyUpdater = () => {
  const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve the logged-in user's data
  let userID = userData ? userData.userId : 1;

  const [reportToVerify, setReportToVerify] = useState(null); // State to track the report that needs to be verified
  
  useEffect(() => {
    const intervalId = setInterval(async () => {  // Run this effect on an interval to check for new reports periodically
        try {
          const userData = JSON.parse(localStorage.getItem('userData')); // Retrieve the logged-in user's data
          let userID = userData ? userData.userId : 1;
          if(userID !== 1){
          const response = await fetch(`http://localhost:8080/verification/get-reports-that-guard-need-to-verify?guardID=${userID}`);

          if (response.ok)
          {
            const data = await response.json(); // data the server gave me
            let dataFromServerArray = Object.values(data); // make it an array

            if (dataFromServerArray.length > 0) // meaning we did get soemthing from the server.
            {
              dataFromServerArray.forEach((element, index) => { // prints the array the server gave me
              });
              setReportToVerify(dataFromServerArray[0]); // put the first element to display
            }
            else // meaning we didnt get anything from the server
            {
              setReportToVerify(null); // No reports to verify
            }
          }
          else
          {
            return;
          }
        }
        }
        catch (error) {
          console.error("Error fetching reports:", error);
        }
    }, 10000); // Check every 10 seconds

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [userID]);

  // Function to close the window
  const handleCloseWindow = () => {
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