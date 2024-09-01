import { Link } from 'react-router-dom';
import './Verification.css';
import logo from '../../../public/logo.jpg';
// import example from '../../../public/example.jpg';
//import guardIcon from './newsGuard.png'; 

function VerificationPage(){
    return(
      <div className='verification-container'>
        <header className='page-header'>
        <img src={logo} alt="NewsGuard Logo" className="logo" />
        <p className='text'>At this moment,</p>
        <p className='text'>a new piece of news has been published about</p>
        <p className='text'>an event that took place in the location you were in the last 24 hours.</p>
        <p className='text'>Be a guard and help us clean the world from fake news!</p>
        <p className='report-text'><strong>The report: </strong></p>
        {/* <img src={example} alt="Example Report" className="example" /> */}
          <nav className='buttons'>
            <Link to="/">
            <button className="approve-button">Approve</button>
            </Link>
            <Link to="/">
            <button className="deny-button">Deny</button>
            </Link>
            <Link to="/">
            <button className="dont-know-button">Don't Know</button>
            </Link>
          </nav>
        </header>
      </div>
     );
}

export default VerificationPage;
/*<img src={logo} alt="News Guard" style={{ width: '150px', height: '150px', marginBottom: '20px' }} />
        <img src={example} alt="example" style={{ width: '150px', height: '150px', marginBottom: '20px' }} />*/




/*
function App() {
  const [report, setReport] = useState('');
  const [placeholder, setPlaceholder] = useState('');

  const fetchReport = () => {
    const sampleReport = "This is a sample report.";
    setReport(sampleReport);
  };

  const handleInputChange = (event) => {
    setPlaceholder(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="News Guard" style={{ width: '150px', height: '150px', marginBottom: '20px' }} />
        <p>At this moment,</p>
        <p>a new piece of news has been published about</p>
        <p>an event that took place in the location you were in the last 24 hours.</p>
        <p>Be a guard and help us clean the world from fake news!</p>
        <p>The report: {report}</p>
        <div>
        <img src={reportExample} alt="News Guard" style={{ width: '400px', height: '300px', marginBottom: '20px' }} />
        
          <br />
          <button>Approve</button>
          <button>Deny</button>
          <button>Don't know</button>
        </div>
      </header>
    </div>
  );
}
*/