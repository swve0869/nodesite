import http from "http";
import { addUser, dynamodb_client } from "./dynamodb_client.js";
import cors from 'cors'
import express from "express"


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


app.post("/newuser", (req, res) => {

  const { username, password} = req.body;
  const result =  addUser(dynamodb_client,username,password); 
  //res.status(200).json({ message: 'gooba!' });
  if(result == false){
    // add logic for failure to add new user
    console.log("NOT UNIQUE USERNAME:" ,username);
    return res.status(201).json({ message: 'Username not Unique', }); 
  }
  else{
    console.log("use created succ")
    return res.status(201).json({ message: 'User created successfully!',errorcode: '0'}); 
  }   
 
  
  //console.log(res)
/*   const { username, password} = req.body;
  console.log("new USER request for", username,password);


  (async (dynamodb_client,username,password) => {
    //console.log("ooga booga")
    const result = await addUser(dynamodb_client,username,password); 
    console.log(result)  
    if(result == false){
      // add logic for failure to add new user
      console.log("NOT UNIQUE USERNAME:" ,username);
      return res.status(201).json({ message: 'TESTET!' }); 
    }
    else{
      return res.status(201).json({ message: 'User created successfully!', }); 
    }   
    
  
  })(dynamodb_client,username,password) 

 */
  
});

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});



/* console.log(await checkIDUnique(dynamodb_client,23401))

if(await checkIDUnique(dynamodb_client,23401) == true){
  console.log("GOOOB")
} */
//checkIDUnique(dynamodb_client,2)

