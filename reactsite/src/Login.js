import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import BASE_URL from './config.js';



const Login = ({change}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        // Handle login logic here
        console.log('Email:', username);
        console.log('Password:', password);

        const url = `${BASE_URL}/newuser`
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
            change();
           // navigate('/Homepage');
            
        } 
    };


    return (
        <div>
            <h2>Login</h2>
            <form >
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
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
                <button type="submit" onClick={handleSubmit}>Login</button>
            </form>
        </div>
    );
};

export default Login;