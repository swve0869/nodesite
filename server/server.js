import http from "http";
import { addUser,userQuery, dynamodb_client } from "./dynamodb_client.js";
import cors from 'cors'
import express from "express"
import fs from "fs"
import https from "https"
import hash from 'hash-it'


const corsOptions = {
  origin: process.env.REACT_APP_DOMAIN, // Replace with the URL you want to allow
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific HTTP methods
  allowedHeaders: ['*'], // Specify allowed headers
  preflightContinue: false, // Pass control to the next middleware if false
  optionsSuccessStatus: 204 // Some legacy browsers choke on 204
};
 
const app = express();
app.use(cors(corsOptions));
app.use(express.json());

// only run in https mode if we are deploying the server
if(process.env.MODE == "deploy"){
  //https requirements including SSL certs
  var key = fs.readFileSync(process.env.SSL_KEY_FILE);
  var cert = fs.readFileSync(process.env.SSL_CRT_FILE);
  var options = {
    key: key,
    cert: cert
  };

  // create server object TESTING
  var server = https.createServer(options, app);
  server.listen(process.env.NODE_SERVER_PORT, () => {
    console.log(`https server starting on ${process.env.NODE_SERVER_PORT}` )
  });
}else{

app.listen(process.env.NODE_SERVER_PORT, () => {
  console.log(`Server listening on ${process.env.NODE_SERVER_PORT}`);
}); 
}

// endpoints
app.get("/api", (req, res) => {
   console.log(req.body)
   res.json({ message: "gooby woobi" });
   console.log("request received")
 });

 app.get("/", (req, res) => {
  console.log(req.body)
  res.json({ message: "hello from serv" });
  console.log("request received")
});

app.post("/newuser", async (req, res) => {

  try{
    const { username, password,email} = req.body;
    console.log(username,password);
    
    let result =  await addUser(dynamodb_client,username,password,email); 
    //if user already exists
    if(result === false){    
      console.log(username, " is not unique");
      return res.status(201).json({ message: 'Username not Unique',errorcode: '1' }); 
    }   
    // else user succesfully added exists log them in
    result = await userQuery(dynamodb_client,hash(username));
    const user_data = {
      username: result.Items[0].username.S ,
      user_id: result.Items[0].user_id.N,
      email: result.Items[0].email.S
    }
    return res.status(200).json({ message: `Succesfully added ${username}`,user_data,errorcode: '0' });

  }catch (error) {
    console.log('Error in user creation:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }

});

app.post("/login", async (req, res) => {

  try{
    const {username, password} = req.body;
    console.log(`trying to login: ${username} with password: ${password}`);
    var saltedpassword = hash(password+process.env.SALT);

    const result = await userQuery(dynamodb_client,hash(username));

    if(!result || result.Items[0].password.S != saltedpassword){
      console.log("login failed");
      return res.status(201).json({ message: 'Login Failed Username or Password Incorrect',errorcode: '1' }); 
    }

    const user_data = {
      username: result.Items[0].username.S ,
      user_id: result.Items[0].user_id.N,
      email: result.Items[0].email.S
    }
    console.log(user_data);
    return res.status(200).json({ message: `Succesfully Logged In `,user_data,errorcode: '0' });
  
  }catch (error){

  }
});





/* console.log(await checkIDUnique(dynamodb_client,23401))

if(await checkIDUnique(dynamodb_client,23401) == true){
  console.log("GOOOB")
} */
//checkIDUnique(dynamodb_client,2)

