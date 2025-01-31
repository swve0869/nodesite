import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import BASE_URL from './config.js';
import Box from './components/Box.js';
import Alert from '@mui/material/Alert';
import Button from './components/Button.js';



const Login = ({handleLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Handle login logic here
        if (!username || !password){
            console.log("missing username or password")
            
        }

        console.log('Email:', username);
        console.log('Password:', password);

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
        .then((data) => {console.log('Success:', data)
            console.log(data.message)
            return data
        })
        .catch((error) => console.error('Got this ERror:', error)); 
        
        // Check if login was successful
        if (data.errorcode === '1'){
            console.log("login failed");
        }
        else{
            handleLogin(data.user_data);            
        } 
    };


    return (
        <Box className="genericbox" width={"50%"} height={"50%"} >
            <h2>Login</h2>
            <form >
                <div>
                    <label>Username:</label>
                    <input
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Alert severity="error">This is an error alert — check it out!</Alert>
                <button type="submit" onClick={handleSubmit} buttonmsg="Login">Login</button>
            </form>
        </Box>
    );
};

export default Login;