import http from "http";
import { addUser, dynamodb_client } from "./dynamodb_client.js";
import cors from 'cors'
import express from "express"


const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the URL you want to allow
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
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


app.post("/newuser", (req, res) => {
  console.log(req)
  
  const { username, password} = req.body;
  console.log("new USER request for", username,password);


  (async (dynamodb_client,username,password) => {

  
     //console.log("ooga booga")
    if( await addUser(dynamodb_client,username,password) == false){
      // add logic for failure to add new user
      console.log("NOT UNIQUE USERNAME:" ,username)
  /*     res.status(201);
      res.body = { "message": 'Username not unique', "servercode":'1'};
      res.send()//console.log(res) */
      res.status(201).json({ message: 'TESTET!' }); 

    }
    else{
      res.status(201).json({ message: 'User created successfully!', }); 
    }   
    
  
  })(dynamodb_client,username,password)

  res.status(200);
  
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});



/* console.log(await checkIDUnique(dynamodb_client,23401))

if(await checkIDUnique(dynamodb_client,23401) == true){
  console.log("GOOOB")
} */
//checkIDUnique(dynamodb_client,2)

