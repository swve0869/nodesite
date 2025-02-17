import React, { useEffect } from "react";
import NewUser from "./NewUser";
import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import Homepage from './Homepage.js';   
import Login from "./Login.js";
import Logout from "./Logout.js";
import Button from "./components/Button.js";  
import {useNavigate} from "react-router-dom";
import Nav from "./components/Nav.js";

//import BASE_URL from './config.js';


function App() {

  const navigate = useNavigate();
  
  let [loggedIn, setLoggedIn] = React.useState(false);
  let [userInfo, setuserInfo] = React.useState({
    username:"",
    userid:"",
    email:"",
  });


  function handleLogin(user_data) {
    if(!loggedIn){
    console.log(user_data);
    setuserInfo(user_data);
    setLoggedIn(true);
    }
    navigate('/Homepage');
    //useEffect(() => {navigate('/Homepage');},[navigate])
  
  }

   


  return (
    <div className="App">

        <Nav />

        {userInfo.loggedIn ? <div></div> : <div>not logged in</div>}
        
          <Routes>
            <Route path="/Login" element={<Login handleLogin={handleLogin} loggedIn={loggedIn}/>}/>
            <Route path="/NewUser" element={<NewUser handleLogin={handleLogin} loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>}/>
            <Route path="/Homepage" element={<Homepage loggedIn = {loggedIn} userInfo = {userInfo}/>}/>
            <Route path="/Logout" element={<Logout loggedIn={loggedIn} setLoggedIn={setLoggedIn} setuserInfo={setuserInfo}/>}/>
          </Routes>
  
    </div>
  );
}

export default App;
