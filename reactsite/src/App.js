import React from "react";
import NewUser from "./NewUser";
import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import Homepage from './Homepage.js';   
import Login from "./Login.js";
import Button from "./components/Button.js";  
import {useNavigate} from "react-router-dom";

//import BASE_URL from './config.js';


function App() {

  const navigate = useNavigate();
  
  let [loggedIn, setLoggedIn] = React.useState(false);
  let [userInfo, setuserInfo] = React.useState({
    username:"ooga",
    userid:"",
    email:"",
  });

  loggedIn ? console.log( ` ${userInfo.username} logged in logged in`) : console.log("/ not logged in");


  function handleLogin(user_data) {
    setuserInfo({user_data});
    setLoggedIn(true);
    //navigate('/Homepage');
   }


  return (
    <div className="App">
        <nav>
          <Link to="/NewUser" className="nav-item" >New User?</Link>
          <Link to="/Homepage" className="nav-item">Homepage</Link>
          <Link to="/" className="nav-item">Login</Link>
        </nav>

        <Button className="button"/>

        {userInfo.loggedIn ? <div>YOure now logged in</div> : <div>not logged in</div>}
        
        
          <Routes>
            <Route path="/" element={<Login handleLogin={handleLogin}/>}/>
            <Route path="/NewUser" element={<NewUser handleLogin={handleLogin}/>}/>
            <Route path="/Homepage" element={<Homepage loggedIn = {loggedIn} userInfo = {userInfo}/>}/>
          </Routes>
  
    </div>
  );
}

export default App;
