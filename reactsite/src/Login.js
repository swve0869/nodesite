import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import BASE_URL from './config.js';
import Box from './components/Box.js';
import Alert from '@mui/material/Alert';



const Login = ({handleLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

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
        
        
        if (data.errorcode === '1'){
            console.log("time to change site");
        }
        else{
            console.log("going to home page");
            handleLogin();
            navigate('/Homepage');
            
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
                <button type="submit" onClick={handleSubmit}>Login</button>
            </form>
        </Box>
    );
};

export default Login;