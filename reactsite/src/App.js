import React from "react";
import NewUser from "./NewUser";
import './App.css';
import { Route, Routes, Link } from 'react-router-dom';

//import BASE_URL from './config.js';

function App() {
  return (
    <div className="App">
        <nav>
          <Link to="/NewUser" className="nav-item">New User?</Link>
        </nav>

        <Routes>
          <Route path="/NewUser" element={<NewUser/>}/>

        </Routes>
        
 
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>


    </div>
  );
}

export default App;
