import React from "react";
import NewUser from "./NewUser";
import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import Homepage from './Homepage.js';   
import Login from "./Login.js";

//import BASE_URL from './config.js';


function App() {

  let [userInfo, setuserInfo] = React.useState({
    loggedIn:false,
    username:"ooga",
    userid:"",

  });


  function handleLogin() {
    console.log(`${userInfo.username} logged in`);
  }


  return (
    <div className="App">
        <nav>
          <Link to="/NewUser" className="nav-item">New User?</Link>
        </nav>

        {userInfo.loggedIn ? <div>YOure now logged in</div> : <div>not logged in</div>}
        
        
          <Routes>
            <Route path="/" element={<Login change={handleLogin}/>}/>
            <Route path="/NewUser" element={<NewUser/>}/>
            <Route path="/Homepage" element={<Homepage/>}/>
          </Routes>
  

    </div>
  );
}

export default App;
