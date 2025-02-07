import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import BASE_URL from './config.js';
import Box from './components/Box.js';
import Alert from '@mui/material/Alert';
import Button from './components/Button.js';
import './Form.css'



const Login = ({handleLogin,loggedIn}) => {
    if(loggedIn){
        handleLogin();
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        // Handle login logic here
        if (!username || !password){
            setErrorMessage("Please fill out all fields")
            return;
        }



        const url = `${BASE_URL}/login`
        var jsonData = {
        "username" : username,
        "password" : password}

        const fetchData = { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json',  },
            body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
        }

        // api call with fetch        
        const data = await fetch(url, fetchData)
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data)
            console.log(data.message)
            // Check if login was successful
            if (data.errorcode === '1'){
                console.log("incorrect username or password");
                setErrorMessage("Incorrect username or password!")
            }
            else{
                handleLogin(data.user_data);            
            } 
        })
        .catch((error) => {
            console.error('Got this ERror:', error)
            setErrorMessage("Connection error please try again")}); 
        
    };


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'vh' }}>
            <Box className="genericbox"  >
                
                <form>
                        <h1>Login</h1>
                        <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        </div>
                        <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        </div>
                        <div type ="alert">
                        {errorMessage? <Alert severity="error">{errorMessage}</Alert> : <a></a>}
                        </div>
                        <div className={"form-group"}>
                        <button type="submit" onClick={handleSubmit} >Login</button>
                        </div>
                </form>
            </Box>
        </div>
    );
};

export default Login;