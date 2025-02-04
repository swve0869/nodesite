import http from "http";
import { addUser,userQuery, dynamodb_client } from "./dynamodb_client.js";
import cors from 'cors'
import express from "express"
import hash from 'hash-it'



const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the URL you want to allow
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific HTTP methods
  allowedHeaders: ['*'], // Specify allowed headers
  preflightContinue: false, // Pass control to the next middleware if false
  optionsSuccessStatus: 204 // Some legacy browsers choke on 204
};
 


const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.get("/api", (req, res) => {
   console.log(req.body)
   res.json({ message: "gooby woobi" });
   console.log("request received")
 });


app.post("/newuser", async (req, res) => {

  try{
    const { username, password,email} = req.body;
    console.log(username,password);
    
    const result =  await addUser(dynamodb_client,username,password,email); 
    //if user already exists
    if(result === false){    
      console.log(username, " is not unique");
      return res.status(201).json({ message: 'Username not Unique',errorcode: '1' }); 
    }   
    // else user succesfully added exist
    return res.status(200).json({ message: `Succesfully added ${username}`,errorcode: '0' });

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
    var query_user_id = hash(username+saltedpassword);

    const result = await userQuery(dynamodb_client,query_user_id);

    if(!result || result.Items[0].password.S != saltedpassword){
      console.log("login failed");
      return res.status(201).json({ message: 'Login Failed Username or Password Incorrect',errorcode: '1' }); 
    }

    const user_data = {
      username: result.Items[0].username.S ,
      password: result.Items[0].password.S,
      user_id: result.Items[0].user_id.N,
      email: result.Items[0].email.S
    }
    console.log(user_data);
    return res.status(200).json({ message: `Succesfully Logged In `,user_data,errorcode: '0' });
  
  }catch (error){

  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});



/* console.log(await checkIDUnique(dynamodb_client,23401))

if(await checkIDUnique(dynamodb_client,23401) == true){
  console.log("GOOOB")
} */
//checkIDUnique(dynamodb_client,2)

