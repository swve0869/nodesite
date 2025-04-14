import React, { useEffect } from "react";
import NewUser from "./NewUser";
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './Homepage.js';   
import Login from "./Login.js";
import Logout from "./Logout.js";
import {useNavigate} from "react-router-dom";
import Nav from "./components/Nav.js";


function App() {

  const navigate = useNavigate();
  
  let [loggedIn, setLoggedIn] = React.useState(false);
  let [firstLogin, setFirstLogin] = React.useState(false);
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
    setFirstLogin(true);
    }else{
      setLoggedIn(false);
      setuserInfo({});
    }
  }


  // once loggedIn 
  useEffect(() => {
    if(firstLogin){
      setFirstLogin(false);
      navigate('/Homepage')}
   
    },[firstLogin,navigate])

    /* useEffect(() => {
      if(!loggedIn){
        setFirstLogin(false);
        navigate('/Login')}
     
      },[loggedIn,navigate]) */
  
   

  return (
    <div className="App">

        <Nav loggedIn={loggedIn} handleLogin={handleLogin}/>

        {loggedIn ? <div></div> : <div>not logged in</div>}
        
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
