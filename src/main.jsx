import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
//nitzan note//////
/*
in index.jsx:
-------------------------------------------------------
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const entryPoint = document.getElementById('root');
ReactDOM.createRoot(entryPoint.render(<App />)
*/