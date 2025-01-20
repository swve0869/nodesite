import React, { Component } from 'react';
import "./NewUser.css";
import md5 from 'md5';
//import axios from 'axios'

import BASE_URL from './config.js';

class NewUser extends Component {


    constructor(props) {
        super(props);
        this.state = {
          username: 'enter username',
          password: 'enter password',
        }
      }

    //form handling before submission
    handleInputChange = (event) => {
        const target = event.target;
        let value = event.target.value;
        const name = target.name;

        
        if (target.name === "password") {
            document.getElementById(name).type = "password";
            value = md5(event.target.value);
        }

        this.setState({
            [name]: value
        });

        document.getElementById(name).style.fontFamily = "Montserrat black";
    }

    setEmptyValue = (event) => {
        const name = event.target.name
        document.getElementById(name).value = "";

    }


    handleSubmit = async (event) => 
        {  
        event.preventDefault();
        const url = `${BASE_URL}/newuser`
        /* var jsonData = {
        "username" : document.getElementById("username").value,
        "password" : document.getElementById("password").value} */
        var jsonData = {
            "username" : "ABAB",
            "password" : "HOGFGDF"}
        const fetchData = { 
            method: 'POST', 
            headers: { 'Content-Type': 'application/json',  },
            body: JSON.stringify(jsonData) // body data type must match "Content-Type" header
        }

        // api call with fetch        
        await fetch(url, fetchData)
        .then((response) => response.json())
        .then((data) => {console.log('Success:', data)
            console.log(data.message)
            return data
        })
        .catch((error) => console.error('Got this ERror:', error)); 
 

        //const webData = await axios.post(url, fetchData);



      
        }
    render() {
    return (
        <div className="login">
        <h4>Create Account</h4>
        <form onSubmit={this.handleSubmit}>
            <div className="text_area">
            <input
                type="text"
                id="username"
                name="username"
                defaultValue={this.state.username}
                onChange={this.handleInputChange}
                onFocus={this.setEmptyValue}
                className="text_input"

            />
            </div>
            <div className="text_area">
            <input
                type="text"
                id="password"
                name="password"
                defaultValue={this.state.password}
                onChange={this.handleInputChange}
                onFocus={this.setEmptyValue}
                className="text_input"

            />
            </div>
            <input
            type="submit"
            value="Submit"
            className="btn"

            />
        </form>
        </div>
    )
}   
}
export default NewUser;

    
     



