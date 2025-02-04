import React, { useState } from 'react';
//import "./NewUser.css";
import md5 from 'md5';
import {useNavigate} from "react-router-dom";
import Homepage from './Homepage.js';   
//import axios from 'axios'

import BASE_URL from './config.js';



const NewUser = ({handleLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        const url = `${BASE_URL}/newuser`
    
        const fetchData = { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json',  },
            body: JSON.stringify({
                "username" : username,
                "password" : password,
                "email" : email
                }) // body data type must match "Content-Type" header
        }

        // api call for /newuser endpoint      
        const data = await fetch(url, fetchData)
        .then((response) => response.json())
        .then((data) => {console.log('Success:', data)
            return data
        })
        .catch((error) => console.error('Got this ERror:', error)); 
        
        
        if (data.errorcode === '1'){
            console.log("time to change site");
        }
        else{
            console.log("going to home page");
            console.log("created new user")
            handleLogin(data.user_data);
            navigate('/Homepage');
            
        } 
    };


    return (
        <div>
            <h2>New User</h2>
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
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                <button type="submit" onClick={handleSubmit}>Create {username}{username ==="" ? '':'\'s '}Account</button>
            </form>
        </div>
    );
};

export default NewUser;