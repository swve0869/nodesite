import React from "react";
import NewUser from "./NewUser";
import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import Homepage from './Homepage.js';   
import Login from "./Login.js";
import Button from "./components/Button.js";  
import {useNavigate} from "react-router-dom";
import Nav from "./components/Nav.js";

//import BASE_URL from './config.js';


function App() {

  const navigate = useNavigate();
  
  let [loggedIn, setLoggedIn] = React.useState(false);
  let [userInfo, setuserInfo] = React.useState({
    username:"ooga",
    userid:"",
    email:"",
  });


  function handleLogin(user_data) {
    user_data.loggedIn = true;
    console.log(user_data);
    setuserInfo(user_data);
    setLoggedIn(true);
    //loggedIn ? console.log( ` ${userInfo.username} logged in logged in`) : console.log("/ not logged in");

    navigate('/Homepage');
   }

   loggedIn ? console.log( ` ${userInfo.username} logged in`) : console.log("/ not logged in");

  const navItems = [
    { name: 'Login', path: '/Login' },
    { name: 'New User', path: '/NewUser' },
    { name: 'Homepage', path: '/Homepage' }
  ]

  return (
    <div className="App">

        <Nav navItems={navItems} />

        <Button className="button"/>

        {userInfo.loggedIn ? <div>YOure now logged in</div> : <div>not logged in</div>}
        
        
          <Routes>
            <Route path="/Login" element={<Login handleLogin={handleLogin}/>}/>
            <Route path="/NewUser" element={<NewUser handleLogin={handleLogin}/>}/>
            <Route path="/Homepage" element={<Homepage loggedIn = {loggedIn} userInfo = {userInfo}/>}/>
          </Routes>
  
    </div>
  );
}

export default App;
